import { createTable, id, timestamps } from "../../utils";
import { text } from "drizzle-orm/sqlite-core";
import { userTable } from "../user";
import { relations, type InferSelectModel } from "drizzle-orm";

export const userNotificationSubscriptionTable = createTable("user_notification_subscription", {
	id,
	endpoint: text("endpoint"),
	p256dh: text("p256dh"),
	auth: text("auth"),
	userId: text("user_id").references(() => userTable.id, { onDelete: "cascade" }),
	createdAt: timestamps.createdAt
});

export type UserNotificationSubscription = InferSelectModel<
	typeof userNotificationSubscriptionTable
>;

export const userNotificationSubscriptionRelation = relations(
	userNotificationSubscriptionTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [userNotificationSubscriptionTable.userId],
			references: [userTable.id]
		})
	})
);
