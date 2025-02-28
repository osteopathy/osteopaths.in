import { text } from "drizzle-orm/sqlite-core";
import { createTable, id, timestamps } from "../../utils";

export const serviceTable = createTable("service", {
	id,
	name: text("name").notNull(),
	description: text("description").notNull(),
	...timestamps
});
