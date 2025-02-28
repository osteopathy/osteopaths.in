import { Google } from "arctic";
import { env } from "$env/dynamic/private";
import { dev } from "$app/environment";

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	dev ? "http://localhost:5173/login/google/callback" : env.GOOGLE_REDIRECT_URI
);
