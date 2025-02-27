import { db } from "$lib/database";
import { count } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { userTable } from "$lib/database/schema";

export const load: PageServerLoad = async () => {
	return {
		users: await db.query.userTable.findMany(),
		userCount: (await db.select({ count: count() }).from(userTable))?.[0].count
	};
};
