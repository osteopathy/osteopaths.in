<script lang="ts">
	import type { Snippet } from "svelte";
	import SelectTheme from "$lib/components/select-theme.svelte";
	import { page } from "$app/state";
	let {
		children,
		header,
		class: className
	}: {
		header: Snippet;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<header class="flex w-full max-w-xl items-center justify-between px-2.5 py-4">
	{@render header()}
	{#if page.url.pathname === "/app"}
		<SelectTheme />
	{/if}
</header>
<main class="h-0 min-h-0 w-full max-w-xl shrink grow overflow-auto {className}">
	{@render children()}
</main>
