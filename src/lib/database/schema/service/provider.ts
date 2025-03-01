import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { userTable } from "../user";
import { serviceTable } from ".";
import { relations, type InferSelectModel } from "drizzle-orm";

export const serviceProviderTable = createTable("service_provider", {
	id,
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	serviceId: text("service_id").references(() => serviceTable.id, { onDelete: "no action" }),
	username: text("username").unique(),
	...timestamps
});

export type ServiceProvider = InferSelectModel<typeof serviceProviderTable>;

export const serviceProviderRelation = relations(serviceProviderTable, ({ one }) => ({
	user: one(userTable, {
		fields: [serviceProviderTable.userId],
		references: [userTable.id]
	}),
	service: one(serviceTable, {
		fields: [serviceProviderTable.serviceId],
		references: [serviceTable.id]
	})
}));
