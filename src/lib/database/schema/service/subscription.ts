import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";
import { userTable } from "../user";
import { serviceProviderTable } from "./provider";

export const serviceSupscriptionTable = createTable("service_subscription", {
	id,
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	serviceProviderId: text("service_provider_id").references(() => serviceProviderTable.id),
	...timestamps
});
