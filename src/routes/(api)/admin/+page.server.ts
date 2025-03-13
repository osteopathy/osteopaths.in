import { db } from "$lib/database";
import { count, eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { userTable } from "$lib/database/schema";
import {
	generateSessionToken,
	setJWTTokenCookie,
	setSessionTokenCookie
} from "$lib/server/auth/session";
import { createSession } from "$lib/server/auth/utils";
import { JWT_SECRET } from "$env/static/private";
import { base64url, EncryptJWT } from "jose";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user?.email !== "sukhpreetben10@gmail.com") redirect(302, "/");
	return {
		users: await db.query.userTable.findMany(),
		userCount: (await db.select({ count: count() }).from(userTable))?.[0].count
	};
};

export const actions: Actions = {
	async default(event) {
		if (event.locals.user?.email !== "sukhpreetben10@gmail.com") redirect(302, "/");
		const formData = await event.request.formData();
		const user_id = formData.get("user_id")?.toString();
		// Impersonation
		if (user_id) {
			const user = await db.query.userTable.findFirst({ where: eq(userTable.id, user_id) });
			if (user) {
				const sessionToken = generateSessionToken();
				const session = await createSession(sessionToken, user_id);
				setSessionTokenCookie(event, sessionToken, session.expiresAt);
				const secret = base64url.decode(JWT_SECRET);
				const payload = { user: user };
				const jwt = await new EncryptJWT(payload)
					.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
					.setExpirationTime(session.expiresAt)
					.encrypt(secret);
				setJWTTokenCookie(event, jwt, session.expiresAt);
				return redirect(302, "/" + user.id);
			}
		}

		return { status: 200 };
	}
};
