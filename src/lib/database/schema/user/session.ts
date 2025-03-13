import { createTable, id, timestamps } from "../../../database/utils";
import { integer, text } from "drizzle-orm/sqlite-core";
import { userTable } from ".";
import { relations, type InferSelectModel } from "drizzle-orm";

export const userSessionTable = createTable("user_session", {
	id,
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	expiresAt: integer("expires_at", {
		mode: "timestamp"
	}).notNull(),
	...timestamps
});

export type UserSession = InferSelectModel<typeof userSessionTable>;

export const userSessionRelation = relations(userSessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [userSessionTable.userId],
		references: [userTable.id]
	})
}));
