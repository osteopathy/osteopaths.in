import { db } from "$lib/database/index.js";
import { userTable } from "$lib/database/schema/index.js";
import { fail, redirect } from "@sveltejs/kit";
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
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
		await sleep(400);

		await db.update(userTable).set({
			name: form.data.name,
			phone: form.data.phone
		});

		return message(form, "Form posted successfully!");
	}
};
