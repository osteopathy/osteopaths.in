import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const random: RandomReader = {
	read(bytes: Uint8Array): void {
		crypto.getRandomValues(bytes);
	}
};

export const createTable = sqliteTableCreator((name) => name);

export const id = text("id")
	.primaryKey()
	.$defaultFn(() => generateRandomString(random, alphabet, 10));

export const timestamps = {
	createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date())
};
