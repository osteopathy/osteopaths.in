import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/database";
import { userNotificationSubscriptionTable } from "$lib/database/schema";
import { and, eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, "Unauthorized");
	}

	const subscription = await request.json();
	await db
		.delete(userNotificationSubscriptionTable)
		.where(
			and(
				eq(userNotificationSubscriptionTable.endpoint, subscription.endpoint),
				eq(userNotificationSubscriptionTable.userId, locals.user.id)
			)
		);

	return json({ status: "success" });
};
