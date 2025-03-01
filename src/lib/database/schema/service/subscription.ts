import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { userTable } from "../user";
import { serviceProviderTable } from "./provider";
import { relations, type InferSelectModel } from "drizzle-orm";

export const serviceSupscriptionTable = createTable("service_subscription", {
	id,
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
	...timestamps
});

export type ServiceSubscription = InferSelectModel<typeof serviceSupscriptionTable>;

export const ServiceSubscriptionRelation = relations(serviceSupscriptionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [serviceSupscriptionTable.userId],
		references: [userTable.id]
	}),
	serviceProvider: one(serviceProviderTable, {
		fields: [serviceSupscriptionTable.serviceProviderId],
		references: [serviceProviderTable.id]
	})
}));
