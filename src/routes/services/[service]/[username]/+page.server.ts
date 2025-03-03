import { db } from "$lib/database";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { serviceAppointmentTable, serviceProviderTable } from "$lib/database/schema";

export const load: PageServerLoad = async (event) => {
	const serviceProvider = await db.query.serviceProviderTable.findFirst({
		where: eq(serviceProviderTable.username, event.params.username),
		with: {
			user: true,
			appointments: true
		}
	});
	return {
		serviceProvider
	};
};
// TODO: Implement Appointment Request,...
export const actions: Actions = {
	subscribe: async () => {},
	unsubscribe: async () => {},
	request: async (event) => {
		const formData = await event.request.formData();
	}
};
