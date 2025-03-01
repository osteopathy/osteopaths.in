import { createTable, id, timestamps } from "../../utils";
import { text } from "drizzle-orm/sqlite-core";
import { userTable } from "../user";

export const userNotificationTable = createTable("user_notification", {
	id,
	title: text("title"),
	body: text("body"),
	status: text("status"),
	userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
	createdAt: timestamps.createdAt
});
