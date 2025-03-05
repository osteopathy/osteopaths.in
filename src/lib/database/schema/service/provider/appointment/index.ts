import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../../../utils";
import { serviceProviderTable } from "..";
import { userTable } from "../../../user";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { customType } from "drizzle-orm/sqlite-core";

// stored in database as %dd-%mm-%yyyy
export const date = customType<{ data: Date; driverData: string }>({
	dataType() {
		return "text";
	},
	toDriver(date: Date): string {
		//   throw new Error(`DateTime is invalid`);
		const formattedDate = date.toLocaleString("en-us", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
		// returned as %mm/%dd/%yyyy;
		const [month, day, year] = formattedDate.split("/");
		// stored as %dd/%mm/%yyyy;
		return `${day}/${month}/${year}`;
	},
	fromDriver(input: string): Date {
		// Try parsing as ISO first
		const [day, month, year] = input.split("/");
		const value = new Date(Date.UTC(+year, +month - 1, +day));
		return value;
	}
});

export const serviceProviderAppointmentTable = createTable("service_provider_appointment", {
	id,
	userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
	serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
	date: date("date"), // %dd/%mm/%yyyy
	startAt: text("start_at"),
	duration: text("duration"),
	location: text("location"),
	status: text("status"),
	...timestamps
});

export type ServiceProviderAppointment = InferSelectModel<typeof serviceProviderAppointmentTable>;
export type InsertServiceProviderAppointment = InferInsertModel<
	typeof serviceProviderAppointmentTable
>;

export const serviceProviderAppointmentRelation = relations(
	serviceProviderAppointmentTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [serviceProviderAppointmentTable.userId],
			references: [userTable.id]
		}),
		serviceProvider: one(serviceProviderTable, {
			fields: [serviceProviderAppointmentTable.serviceProviderId],
			references: [serviceProviderTable.id]
		})
	})
);
