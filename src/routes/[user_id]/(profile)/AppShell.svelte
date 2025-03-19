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
		<nav class="fixed bottom-20 flex w-full max-w-xl justify-end">
			<div
				class="bg-layer-3/20 shadow-layer-4 flex gap-x-4 rounded-full p-2 shadow-inner backdrop-blur-sm"
			>
				<a
					aria-current={page.url.pathname === `/${userId}/dashboard` && "page"}
					href="/{userId}/dashboard"
					class="group aria-[current='page']:bg-layer-0 dark:aria-[current='page']:text-layer-13 dark:text-layer-12 aria-[current='page']:border-layer-5 aria-[current='page']:shadow-layer-6 dark:aria-[current='page']:shadow-layer-11 border-layer-7 dark:aria-[current='page']:bg-layer-10 bg-layer-4 text-foreground/70 aria-[current='page']:text-layer-11 relative flex w-max flex-col items-center justify-center rounded-full border px-4 py-2 shadow-sm dark:aria-[current='page']:shadow-inner"
				>
					<span class="text-xs font-medium sm:text-sm">Dashboard</span>
				</a>
				<a
					aria-current={page.url.pathname === `/${userId}` && "page"}
					href="/{userId}"
					class="group aria-[current='page']:bg-layer-0 dark:aria-[current='page']:text-layer-13 dark:text-layer-12 aria-[current='page']:border-layer-5 aria-[current='page']:shadow-layer-6 dark:aria-[current='page']:shadow-layer-11 border-layer-7 dark:aria-[current='page']:bg-layer-10 bg-layer-4 text-foreground/70 aria-[current='page']:text-layer-11 relative flex w-max flex-col items-center justify-center rounded-full border px-4 py-2 shadow-sm dark:aria-[current='page']:shadow-inner"
				>
					<span class="text-xs font-medium sm:text-sm">Profile</span>
				</a>
			</div>
		</nav>
	{/if}
</AppShell>
