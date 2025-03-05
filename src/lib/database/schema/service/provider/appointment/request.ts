import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../../../utils";
import { userTable } from "../../../user";
import { date } from ".";
import { serviceProviderTable } from "../index";
import { relations } from "drizzle-orm";
import type { unknown } from "zod";

// Pending: The initial state, awaiting processing.
// Accepted: The request has been approved.
// Rejected: The request has been denied.
// Cancelled: The request was accepted but subsequently withdrawn by either party.
// Completed: The appointment has taken place.
// No-Show: The appointment was accepted, but the requesting party did not attend.

export const WithDrawReasons = {
	AnotherRequestAccepted: "Another Request is Accepted by ...",
	unknown: "unknown"
};

export const serviceProviderAppointmentRequestTable = createTable(
	"service_provider_appointment_request",
	{
		id,
		userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
		serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
		date: date("date"), // %dd/%mm/%yyyy
		startAt: text("start_at"), // user preferred start time
		endAt: text("end_at"), // user preferred availability time
		note: text("note"),
		reply: text("reply"),
		status: text("status", { enum: ["idle", "accepted", "withdrawn"] }),
		withdrawnReason: text("withdrawn_reason"),
		userAgreed: integer("user_agreed", { mode: "boolean" }).default(false),
		...timestamps
	}
);

export const serviceProviderAppointmentRequestRelation = relations(
	serviceProviderAppointmentRequestTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [serviceProviderAppointmentRequestTable.userId],
			references: [userTable.id]
		}),
		serviceProvider: one(serviceProviderTable, {
			fields: [serviceProviderAppointmentRequestTable.serviceProviderId],
			references: [serviceProviderTable.id]
		})
	})
);
