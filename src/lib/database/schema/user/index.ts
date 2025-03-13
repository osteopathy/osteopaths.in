import { createTable, id, timestamps } from "../../../database/utils";
import { relations, type InferSelectModel } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";
import { userSessionTable } from "./session";
import { studentTable } from "../student";
import { serviceProviderTable } from "../service/provider";
import { userNotificationSubscriptionTable } from "../notification/subscription";
import { serviceSubscriptionTable } from "../service/subscription";
import { serviceProviderAppointmentTable } from "../service/provider/appointment";
import { serviceProviderAppointmentRequestTable } from "../service/provider/appointment/request";

export const userTable = createTable("user", {
	id,
	googleId: text("googleId"),
	email: text("email"),
	phone: text("phone"),
	picture: text("picture"),
	universityMail: text("universityMail"),
	status: text("status", { enum: ["verified", "idle"] }),
	metadata: text("metadata", { mode: "json" }).$type<{
		server_provider_id?: string;
		student_id?: string;
	}>(),
	name: text("name"),
	role: text("role", { enum: ["user", "student", "service_provider", "guest"] }).default("user"),
	...timestamps
});

export type User = InferSelectModel<typeof userTable>;

export const userRelation = relations(userTable, ({ one, many }) => ({
	sessions: many(userSessionTable),
	student: one(studentTable, {
		fields: [userTable.id],
		references: [studentTable.userId]
	}),
	serviceProviders: many(serviceProviderTable),
	serviceSubscriptions: many(serviceSubscriptionTable),
	appointments: many(serviceProviderAppointmentTable),
	requests: many(serviceProviderAppointmentRequestTable),
	userNotifications: many(userNotificationSubscriptionTable),
	userNotificationSubscriptions: many(userNotificationSubscriptionTable)
}));
