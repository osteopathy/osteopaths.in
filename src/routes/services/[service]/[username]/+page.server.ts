import { db } from "$lib/database";
import { and, eq, is } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { serviceProviderTable, serviceSubscriptionTable } from "$lib/database/schema";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/");
	const serviceProvider = await db.query.serviceProviderTable.findFirst({
		where: eq(serviceProviderTable.username, event.params.username),
		with: {
			user: true,
			appointments: true,
			subscriptions: {
				where: eq(serviceSubscriptionTable.userId, event.locals.user.id),
				limit: 1
			}
		}
	});
	return {
		serviceProvider,
		isSubscribed: (serviceProvider?.subscriptions ?? []).length > 0
	};
};
// TODO: Implement Appointment Request,...
export const actions: Actions = {
	subscribe: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		const formData = await event.request.formData();
		const service_provider_id = formData.get("service_provider_id")?.toString();
		await db.insert(serviceSubscriptionTable).values({
			userId: event.locals.user.id,
			serviceProviderId: service_provider_id
		});
		// console.log("Subscribe ...");
		return { subscribed: true };
	},
	unsubscribe: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		const formData = await event.request.formData();
		const service_provider_id = formData.get("service_provider_id")?.toString();
		if (!service_provider_id) redirect(302, "/");
		await db
			.delete(serviceSubscriptionTable)
			.where(
				and(
					eq(serviceSubscriptionTable.userId, event.locals.user.id),
					eq(serviceSubscriptionTable.serviceProviderId, service_provider_id)
				)
			);
		// console.log("Unsubscribe ...");
		return { subscribed: false };
	}
};
