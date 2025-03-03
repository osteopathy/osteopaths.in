import { db } from "$lib/database";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { serviceProviderTable } from "$lib/database/schema";

export const load: PageServerLoad = async (event) => {
	const serviceProviderList = await db.query.serviceProviderTable.findMany({
		where: eq(serviceProviderTable.serviceId, event.params.service),
		with: {
			user: true
		}
	});
	return {
		serviceProviderList
	};
};
