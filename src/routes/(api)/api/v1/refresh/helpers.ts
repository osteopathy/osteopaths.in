import { browser } from "$app/environment";
import type { RequestEvent } from "@sveltejs/kit";

export async function syncCurrentUser(event?: RequestEvent) {
	if (browser) {
		return await fetch("/api/v1/refresh", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({})
		});
	} else if (event) {
		return await event.fetch("/api/v1/refresh", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({})
		});
	} else {
		throw new Error("SYNC USER FAIL: No event or browser");
	}
}
