import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth/session";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/app");
	return {};
};

export const actions: Actions = {
	logout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, "/login");
	}
};
