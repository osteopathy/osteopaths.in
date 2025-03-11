import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { serviceSubscriptionTable } from "$lib/database/schema";
import { db } from "$lib/database";
import { and, eq } from "drizzle-orm";

export const actions: Actions = {
	subscribe: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		await db.insert(serviceSubscriptionTable).values({
			userId: event.locals.user.id,
			serviceProviderId: event.params.service_provider_id
		});
		return { subscribed: true };
	},
	unsubscribe: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		await db
			.delete(serviceSubscriptionTable)
			.where(
				and(
					eq(serviceSubscriptionTable.userId, event.locals.user.id),
					eq(serviceSubscriptionTable.serviceProviderId, event.params.service_provider_id)
				)
			);
		return { subscribed: false };
	}
};
