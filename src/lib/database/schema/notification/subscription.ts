import { createTable, id, timestamps } from "../../utils";
import { text } from "drizzle-orm/sqlite-core";
import { userTable } from "../user";

export const userNotificationSubscriptionTable = createTable("user_notification_subscription", {
	id,
	endpoint: text("endpoint"),
	p256dh: text("p256dh"),
	auth: text("auth"),
	userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
	createdAt: timestamps.createdAt
});
