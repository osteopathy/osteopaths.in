import { generateSessionToken, setSessionTokenCookie } from "$lib/server/auth/session";
import { google } from "$lib/server/auth/google";
import { decodeIdToken } from "arctic";

import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";
import {
	createUser,
	createSession,
	getUserFromGoogleId,
	updateUniversityMail,
	updateGoogleAccount,
	getUserFromUniversityMail,
	createStudent,
	connectStudent,
	createUserWithUniversityMail
} from "$lib/server/auth/utils";

// {
//   iss: 'https://accounts.google.com',
//   azp: 'b.',
//   aud: 'b.',
//   sub: 'a',
//   email: 'a',
//   email_verified: true,
//   at_hash: '-',
//   name: '',
//   picture: 'asd',
//   given_name: 'as',
//   family_name: 'a',
//   iat: 22..,
//   exp: 12.
// }

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("google_oauth_state") ?? null;
	const codeVerifier = event.cookies.get("google_code_verifier") ?? null;

	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}

	const resolveSession = async (
		event: RequestEvent,
		userId: string,
		verified: boolean = true,
		message?: string
	) => {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app" + (message ? "?message=" + encodeURIComponent(message) : "")
			}
		});
	};

	const claims = decodeIdToken(tokens.idToken()) as {
		sub: string;
		name: string;
		email: string;
		picture: string;
	};

	// Reason to use googleUserId instead of just email
	// A Google ID token's sub field is unique to each Google Account and is never reused.
	// A Google Account can have multiple email addresses, but only one ID token.
	const userDetails = {
		name: claims.name,
		email: claims.email,
		picture: claims.picture,
		googleId: claims.sub
	};

	// checking if the mail is ending with @srisriuniversity.edu.in
	const [identifier, domain] = userDetails.email.split("@");

	if (event.locals.user && state?.endsWith("-mail")) {
		if (state.endsWith("university-mail") && domain === "srisriuniversity.edu.in") {
			// first-time need to create entry in student table
			if (!event.locals.user.universityMail) {
				const existingUser = await getUserFromUniversityMail(userDetails.email);

				if (existingUser) {
					return resolveSession(
						event,
						event.locals.user.id,
						event.locals.user.status === "verified",
						`already another account is linked to this university email ${userDetails.email}`
					);
				}

				const id = identifier.split(".")[1];
				const batch = id.substring(1, 5);
				const course = id.substring(5);

				if (batch && course) {
					await connectStudent(
						event.locals.user.id,
						userDetails.email,
						userDetails.name,
						batch,
						course
					);
					return resolveSession(event, event.locals.user.id);
				}
			}

			await updateUniversityMail(event.locals.user.id, userDetails.email);
		}
		if (state.endsWith("personal-mail")) {
			const existingUser = await getUserFromGoogleId(userDetails.googleId);

			if (existingUser) {
				return resolveSession(
					event,
					event.locals.user.id,
					event.locals.user.status === "verified",
					`already another account is linked to this mail ${userDetails.email}`
				);
			}

			await updateGoogleAccount(event.locals.user.id, userDetails.googleId, userDetails.email);
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app"
			}
		});
	}

	const existingUser = await (async () => {
		if (domain === "srisriuniversity.edu.in") {
			return await getUserFromUniversityMail(userDetails.email);
		}
		if (domain === "gmail.com") {
			return await getUserFromGoogleId(userDetails.googleId);
		}
		return null;
	})();

	if (existingUser !== null) {
		return resolveSession(event, existingUser.id, existingUser.status === "verified");
	}

	if (domain === "srisriuniversity.edu.in") {
		const id = identifier.split(".")[1];

		const batch = id.substring(1, 5);
		const course = id.substring(5);

		if (batch && course) {
			const student = await createStudent(
				userDetails.email,
				userDetails.name,
				userDetails.picture,
				batch,
				course
			);
			return resolveSession(event, student.userId);
		}

		const user = await createUserWithUniversityMail(
			userDetails.email,
			userDetails.name,
			userDetails.picture
		);
		return resolveSession(event, user.id);
	}

	const user = await createUser(
		userDetails.googleId,
		userDetails.name,
		userDetails.email,
		userDetails.picture
	);
	return resolveSession(event, user.id, false);
}
