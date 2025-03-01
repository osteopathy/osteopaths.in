import { error, json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/database";
import {
	serviceAppointmentTable,
	type ServiceAppointment,
	type InsertServiceAppointment
} from "$lib/database/schema/service/appointment";
import { and, eq } from "drizzle-orm";

export const GET: RequestHandler = async (event) => {
	const id = event.url.searchParams.get("id");
	const user_id = event.url.searchParams.get("user_id");

	if (id !== null && user_id !== null)
		return json({
			data: await db.query.serviceAppointmentTable.findMany({
				where: and(eq(serviceAppointmentTable.id, id), eq(serviceAppointmentTable.userId, user_id))
			})
		});
	else if (id !== null && user_id === null)
		return json({
			data: await db.query.serviceAppointmentTable.findFirst({
				where: eq(serviceAppointmentTable.id, id)
			})
		});
	else if (id === null && user_id !== null)
		return json({
			data: await db.query.serviceAppointmentTable.findMany({
				where: eq(serviceAppointmentTable.userId, user_id)
			})
		});
	else return json({ data: await db.query.serviceAppointmentTable.findMany() });
};

export const POST: RequestHandler = async (event) => {
	const appointment = (await event.request.json()) as InsertServiceAppointment;

	const res = (await db.insert(serviceAppointmentTable).values(appointment).returning())[0];

	return json({ data: res });
};

export const PUT: RequestHandler = async (event) => {
	const id = event.url.searchParams.get("id");

	if (id === null) return error(404, { message: "APPOINTMENT ID NULL" });

	const appointment = (await event.request.json()) as Partial<Omit<ServiceAppointment, "id">>;

	const res = (
		await db
			.update(serviceAppointmentTable)
			.set(appointment)
			.where(eq(serviceAppointmentTable.id, id))
			.returning()
	)[0];

	return json({ data: res });
};

export const DELETE: RequestHandler = async (event) => {
	const id = event.url.searchParams.get("id");

	if (id === null) return error(404, { message: "APPOINTMENT ID NULL" });

	const res = (
		await db.delete(serviceAppointmentTable).where(eq(serviceAppointmentTable.id, id)).returning()
	)[0];

	return json({ data: res });
};
