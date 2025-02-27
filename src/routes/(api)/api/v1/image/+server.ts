import { error, json, type RequestHandler } from "@sveltejs/kit";
import cloudinary from "$lib/server/cloudinary";
import { db } from "$lib/database";
import { userTable } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = (async ({ request }) => {
	const { userId, url } = await request.json();
	try {
		// fetch previous image url
		const res = await db.query.userTable.findFirst({
			where: eq(userTable.id, userId),
			columns: { picture: true }
		});
		if (res?.picture !== null) {
			if (res?.picture.includes("https://res.cloudinary.com")) {
				const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
				const getPublicIdFromUrl = (cloudinaryUrl: string) => {
					const match = cloudinaryUrl.match(regex);
					return match ? match[1] : null;
				};
				const publicId = getPublicIdFromUrl(res.picture);
				try {
					await cloudinary.uploader.destroy(publicId as string);
				} catch (error) {
					console.error("Cloudinary destroy error:", error);
				}
			}
		}
		const user = await db.update(userTable).set({ picture: url }).where(eq(userTable.id, userId));
		if (user.rowsAffected === 0) {
			return error(404, "Not Updated");
		}
		return json({ url, userId });
	} catch (e) {
		return error(500, `Server Error: ${e}`);
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const { userId, url } = await request.json();
	const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
	const getPublicIdFromUrl = (cloudinaryUrl: string) => {
		const match = cloudinaryUrl.match(regex);
		return match ? match[1] : null;
	};
	const publicId = getPublicIdFromUrl(url);
	try {
		try {
			await cloudinary.uploader.destroy(publicId as string);
		} catch (error) {
			console.error("Cloudinary destroy error:", error);
		}
		await db.update(userTable).set({ picture: null }).where(eq(userTable.id, userId));
		return json({ publicId });
	} catch (e) {
		return error(500, `Server Error: ${error}`);
	}
}) satisfies RequestHandler;
