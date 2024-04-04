import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { osteopaths } from "../data"

export const load: PageServerLoad = async ({ params }) => {
	const osteopathId = params.osteopath;
	const osteopath = osteopaths.find(osteopath => osteopath.id === osteopathId);	

	if (osteopath) {
		return osteopath;
	}

	error(404, 'Not found');
};