import { createTable, id, timestamps } from "../../../database/utils";
import { relations, type InferSelectModel } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";
import { userTable } from "../user";

export const studentTable = createTable("student", {
	id,
	batch: text("batch"),
	course: text("course"),
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	...timestamps
});

export type Student = InferSelectModel<typeof studentTable>;

export const studentRelation = relations(studentTable, ({ one }) => ({
	user: one(userTable, {
		fields: [studentTable.userId],
		references: [userTable.id]
	})
}));
