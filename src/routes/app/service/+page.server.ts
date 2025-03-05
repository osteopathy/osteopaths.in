import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
	if (!event.locals.user) redirect(302, "/");
	const data = await event.parent();
	return {
		subscriptions: data.subscriptions,
		appointmentRequests: data.appointmentRequests
	};
};
