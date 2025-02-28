import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { relations, type InferSelectModel } from "drizzle-orm";
import { serviceProviderTable } from "./provider";

export const serviceTable = createTable("service", {
	id,
	name: text("name").notNull(),
	description: text("description").notNull(),
	...timestamps
});

export type Service = InferSelectModel<typeof serviceTable>;

export const serviceProviderRelation = relations(serviceTable, ({ many }) => ({
	providers: many(serviceProviderTable)
}));
