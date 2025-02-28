import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { serviceProviderTable } from "./provider";
import { userTable } from "../user";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const serviceAppointmentTable = createTable("service_appointment", {
	id,
	userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
	serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
	date: text("date"),
	startAt: text("start_at"),
	duration: text("duration"),
	status: text("status"),
	...timestamps
});

export type ServiceAppointment = InferSelectModel<typeof serviceAppointmentTable>;
export type InsertServiceAppointment = InferInsertModel<typeof serviceAppointmentTable>;
