import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { customType, integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

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

export const date = customType<{ data: Date; driverData: string }>({
	dataType() {
		return "text";
	},
	toDriver(date: Date): string {
		//   throw new Error(`DateTime is invalid`);
		const formattedDate = date.toLocaleString("en-us", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
		// returned as %mm/%dd/%yyyy;
		const [month, day, year] = formattedDate.split("/");
		// stored as %dd/%mm/%yyyy;
		return `${day}/${month}/${year}`;
	},
	fromDriver(input: string): Date {
		// Try parsing as ISO first
		const [day, month, year] = input.split("/");
		const value = new Date(Date.UTC(+year, +month - 1, +day));
		return value;
	}
});
