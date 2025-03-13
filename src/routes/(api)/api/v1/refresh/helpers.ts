export async function syncCurrentUser() {
	await fetch("/api/v1/refresh", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({})
	});
}
