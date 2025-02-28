import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/database";
import { userNotificationSubscriptionTable } from "$lib/database/schema";

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, "Unauthorized");
	}

	const subscription = await request.json();
	await db.insert(userNotificationSubscriptionTable).values({
		endpoint: subscription.endpoint,
		p256dh: subscription.keys.p256dh,
		auth: subscription.keys.auth,
		userId: locals.user.id
	});

	return json({ status: "success" });
};
