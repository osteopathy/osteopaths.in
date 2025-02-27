import "vite-plugin-pwa/svelte";
import "vite-plugin-pwa/info";
import "vite-plugin-pwa/pwa-assets";

import "unplugin-icons/types/svelte";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import("$lib/server/auth/session").SessionValidationResult["user"];
			session: import("$lib/server/auth/session").SessionValidationResult["session"];
		}
	}
}

export {};
