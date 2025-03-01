import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
	deleteSessionTokenCookie,
	invalidateSession,
	sessionCookieName
} from "$lib/server/auth/session";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/app");
	return {};
};

export const actions: Actions = {
	logout: async (event) => {
		const sessionToken = event.cookies.get(sessionCookieName);
		if (event.locals.user === null || !sessionToken) {
			return fail(401);
		}
		invalidateSession(sessionToken);
		deleteSessionTokenCookie(event);
		return redirect(302, "/login");
	}
};
