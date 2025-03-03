import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/database";
import { eq, isNull, or } from "drizzle-orm";
import { serviceAppointmentTable, serviceSubscriptionTable } from "$lib/database/schema";

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/");
	event.locals.user.id;
	const subscriptions = await db.query.serviceSubscriptionTable.findMany({
		where: eq(serviceSubscriptionTable.userId, event.locals.user.id),
		with: {
			serviceProvider: {
				with: {
					user: true,
					appointments: {
						where: or(
							isNull(serviceAppointmentTable.userId),
							eq(serviceAppointmentTable.userId, event.locals.user.id)
						)
					}
				}
			}
		}
	});
	return { subscriptions };
};
