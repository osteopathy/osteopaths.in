import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { webPush } from "$lib/server/webpush";
import { db } from "$lib/database";
import { userNotificationTable } from "$lib/database/schema/notification";
import { eq } from "drizzle-orm";
import { userNotificationSubscriptionTable } from "$lib/database/schema";

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, "Unauthorized");
	}

	const { title, body, userId }: { title: string; body: string, userId: string } = await request.json();
	await db.insert(userNotificationTable).values({ title, body, userId });

	const subscriptions = await db.query.userNotificationSubscriptionTable.findMany({
		where: eq(userNotificationSubscriptionTable.userId, userId)
	});

	// Send push notification to all user's subscriptions
	const notifications = subscriptions.map((subscription) => {
		if (!subscription.auth || !subscription.p256dh || !subscription.endpoint) return;
		const pushSubscription = {
			endpoint: subscription.endpoint,
			keys: {
				p256dh: subscription.p256dh,
				auth: subscription.auth
			}
		};
		// The PushSubscription you wish to send the notification to.
		return webPush.sendNotification(
			pushSubscription,
			JSON.stringify({
				title,
				body
			})
		);
	});

	await Promise.all(notifications);

	return json({ status: "success" });
};
