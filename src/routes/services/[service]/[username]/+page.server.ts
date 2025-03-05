import { db } from "$lib/database";
import { and, asc, eq, inArray, is, not } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import {
	serviceProviderAppointmentRequestTable,
	serviceProviderDateWiseScheduleTable,
	serviceProviderTable,
	serviceSubscriptionTable,
	WithDrawReasons
} from "$lib/database/schema";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/");
	const appointmentRequests = await db.query.serviceProviderAppointmentRequestTable.findMany({
		where: and(
			not(eq(serviceProviderAppointmentRequestTable.status, "withdrawn")),
			eq(serviceProviderAppointmentRequestTable.userId, event.locals.user.id)
		)
	});

	const serviceProviderIds = appointmentRequests
		.map((req) => req.serviceProviderId)
		.filter(Boolean) as string[];

	const serviceProvider = await db.query.serviceProviderTable.findFirst({
		where: eq(serviceProviderTable.username, event.params.username),
		with: {
			user: true,
			appointments: true,
			dateWiseScheduleList: {
				orderBy: [
					asc(serviceProviderDateWiseScheduleTable.date),
					asc(serviceProviderDateWiseScheduleTable.startAt)
				],
				where: not(
					inArray(serviceProviderDateWiseScheduleTable.serviceProviderId, serviceProviderIds)
				)
			},
			subscriptions: {
				where: eq(serviceSubscriptionTable.userId, event.locals.user.id),
				limit: 1
			}
		}
	});
	return {
		serviceProvider,
		isSubscribed: (serviceProvider?.subscriptions ?? []).length > 0,
		appointmentRequests
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
	},
	appointmentrequest: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		const formData = await event.request.formData();
		const service_provider_id = formData.get("service_provider_id")?.toString() ?? null;
		const date = formData.get("date")?.toString() ?? null;
		const start_at = formData.get("start_at")?.toString() ?? null;
		const end_at = formData.get("end_at")?.toString() ?? null;
		const note = formData.get("note")?.toString() ?? null;
		if (!date) {
			return { success: false, error: "Date is required" };
		}
		const [day, month, year] = date.split("/");
		const parsedDate = new Date(Date.UTC(+year, +month - 1, +day));
		console.log("Request sent");
		await db.insert(serviceProviderAppointmentRequestTable).values({
			userId: event.locals.user.id,
			serviceProviderId: service_provider_id,
			date: parsedDate,
			startAt: start_at,
			endAt: end_at,
			note,
			status: "idle"
		});
		return { success: true };
	},
	withdrawrequest: async (event) => {
		if (!event.locals.user) redirect(302, "/");
		const formData = await event.request.formData();
		const appointment_request_id = formData.get("appointment_request_id")?.toString() ?? null;
		console.log("Withdraw request");
		if (!appointment_request_id) {
			return { success: false, error: "Appointment request ID is required" };
		}
		await db
			.update(serviceProviderAppointmentRequestTable)
			.set({
				status: "withdrawn",
				withdrawnReason: WithDrawReasons["unknown"]
			})
			.where(eq(serviceProviderAppointmentRequestTable.id, appointment_request_id));
		return { success: true };
	}
};
