import { db } from "$lib/database/index.js";
import { userTable } from "$lib/database/schema/index.js";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({
	name: z.string().nullable(),
	phone: z.string().nullable()
});
export const load = async (event) => {
	if (!event.locals.user) redirect(302, "/");
	const form = await superValidate(
		{ name: event.locals.user?.name, phone: event.locals.user?.phone },
		zod(schema)
	);

	return { form };
};

export const actions = {
	default: async ({ request, locals, cookies }) => {
		if (!locals.user) return fail(401, { message: "Unauthorized" });

		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
		console.log("Updating", form.data, locals.user);
		const res = await db
			.update(userTable)
			.set({
				name: form.data.name,
				phone: form.data.phone
			})
			.where(eq(userTable.id, locals.user?.id));

		cookies.set("hard-refresh", "TRUE", {
			httpOnly: true,
			path: "/",
			secure: import.meta.env.PROD,
			sameSite: "lax",
			expires: new Date(Date.now() + 3600)
		});

		console.log("RES", res.rows);
		return message(form, "Form posted successfully!");
	}
};
