import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { userTable } from "../user";
import { serviceTable } from ".";

export const serviceProviderTable = createTable("service_provider", {
	id,
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	serviceId: text("service_id").references(() => serviceTable.id, { onDelete: "no action" }),
	username: text("username").unique(),
	...timestamps
});
