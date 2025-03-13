import { text } from "drizzle-orm/sqlite-core";
import { createTable, date, id, timestamps } from "../../../utils";
import { serviceProviderTable } from ".";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { serviceProviderAppointmentRequestTable } from "./appointment/request";

export const serviceProviderDateWiseScheduleTable = createTable(
	"service_provider_date_wise_schedule",
	{
		id,
		serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
		date: date("date"), // %dd/%mm/%yyyy
		startAt: text("start_at"),
		endAt: text("end_at"),
		...timestamps
	}
);

export type ServiceProviderDateWiseSchedule = InferSelectModel<
	typeof serviceProviderDateWiseScheduleTable
>;
export type InsertServiceProviderDateWiseSchedule = InferInsertModel<
	typeof serviceProviderDateWiseScheduleTable
>;

export const serviceProviderDateWiseScheduleRelation = relations(
	serviceProviderDateWiseScheduleTable,
	({ one, many }) => ({
		serviceProvider: one(serviceProviderTable, {
			fields: [serviceProviderDateWiseScheduleTable.serviceProviderId],
			references: [serviceProviderTable.id]
		}),
		requests: many(serviceProviderAppointmentRequestTable)
	})
);
