<script lang="ts">
	import { page } from "$app/state";
	import type { Snippet } from "svelte";
	import AppShell from "../../AppShell.svelte";
	import type { User } from "$lib/database/schema";

	let {
		children,
		userId,
		role,
		header
	}: {
		children: Snippet;
		userId: string;
		role: User["role"];
		header: Snippet;
	} = $props();
</script>

<AppShell {header} class="flex flex-col items-center gap-y-8">
	{@render children()}
	{#if role === "service_provider"}
		<nav class="fixed bottom-20 flex w-full max-w-xl justify-end gap-x-4 p-2">
			<a
				aria-current={page.url.pathname === `/${userId}/dashboard` && "page"}
				href="/{userId}/dashboard"
				class="group aria-[current='page']:bg-layer-11 dark:aria-[current='page']:text-foreground dark:aria-[current='page']:bg-layer-6 aria-[current='page']:border-layer-8 aria-[current='page']:shadow-layer-8 border-layer-3 bg-layer-2 text-foreground/70 dark:text-foreground relative flex w-max flex-col items-center justify-center rounded-full border px-4 py-2 shadow-sm aria-[current='page']:text-white dark:aria-[current='page']:shadow-inner"
			>
				<span class="text-xs font-medium sm:text-sm">Dashboard</span>
			</a>
			<a
				aria-current={page.url.pathname === `/${userId}` && "page"}
				href="/{userId}"
				class="group aria-[current='page']:bg-layer-11 dark:aria-[current='page']:text-foreground dark:aria-[current='page']:bg-layer-6 aria-[current='page']:border-layer-8 aria-[current='page']:shadow-layer-8 border-layer-3 bg-layer-2 text-foreground/70 dark:text-foreground relative flex w-max flex-col items-center justify-center rounded-full border px-4 py-2 shadow-sm aria-[current='page']:text-white dark:aria-[current='page']:shadow-inner"
			>
				<span class="text-xs font-medium sm:text-sm">Profile</span>
			</a>
		</nav>
	{/if}
</AppShell>
