import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../../utils";
import { userTable } from "../../user";
import { serviceTable } from "..";
import { relations, type InferSelectModel } from "drizzle-orm";
import { serviceProviderAppointmentTable } from "./appointment";
import { serviceSubscriptionTable } from "../subscription";
import { serviceProviderDateWiseScheduleTable } from "./date_wise_schedule";
import { serviceProviderAppointmentRequestTable } from "./appointment/request";

export const serviceProviderTable = createTable("service_provider", {
	id,
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	serviceId: text("service_id").references(() => serviceTable.id, { onDelete: "no action" }),
	username: text("username").unique(),
	location: text("location"),
	...timestamps
});

export type ServiceProvider = InferSelectModel<typeof serviceProviderTable>;

export const serviceProviderRelation = relations(serviceProviderTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [serviceProviderTable.userId],
		references: [userTable.id]
	}),
	service: one(serviceTable, {
		fields: [serviceProviderTable.serviceId],
		references: [serviceTable.id]
	}),
	appointments: many(serviceProviderAppointmentTable),
	subscriptions: many(serviceSubscriptionTable),
	appointmentRequests: many(serviceProviderAppointmentRequestTable),
	dateWiseScheduleList: many(serviceProviderDateWiseScheduleTable)
}));
