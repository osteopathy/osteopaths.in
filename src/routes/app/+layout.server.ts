import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/database";
import { not, inArray, eq, and } from "drizzle-orm";
import {
	serviceProviderAppointmentRequestTable,
	serviceProviderDateWiseScheduleTable,
	serviceSubscriptionTable
} from "$lib/database/schema";

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/");

	const appointmentRequests = await db.query.serviceProviderAppointmentRequestTable.findMany({
		where: and(
			not(eq(serviceProviderAppointmentRequestTable.status, "withdrawn")),
			eq(serviceProviderAppointmentRequestTable.userId, event.locals.user.id)
		),
		with: {
			serviceProvider: {
				with: {
					user: true
				}
			}
		}
	});

	const serviceProviderIds = appointmentRequests
		.map((req) => req.serviceProviderId)
		.filter(Boolean) as string[];
	const subscriptions = await db.query.serviceSubscriptionTable.findMany({
		where: eq(serviceSubscriptionTable.userId, event.locals.user.id),
		with: {
			serviceProvider: {
				with: {
					user: true,
					dateWiseScheduleList: {
						where: not(
							inArray(serviceProviderDateWiseScheduleTable.serviceProviderId, serviceProviderIds)
						)
					}
					// appointmentRequests: {
					// 	where: eq(serviceProviderAppointmentRequestTable.userId, event.locals.user.id)
					// },
					// appointments: {
					// 	where: eq(serviceProviderAppointmentTable.userId, event.locals.user.id)
					// }
				}
			}
		}
	});

	return { subscriptions, appointmentRequests };
};
