<script lang="ts">
	import type { Snippet } from "svelte";
	import SelectTheme from "$lib/components/select-theme.svelte";
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

<header class="mb-6 flex w-full max-w-xl items-center justify-between px-2.5 pt-4">
	{@render header()}
	<SelectTheme />
</header>
<main class="w-full max-w-xl grow px-2.5 pb-16 {className}">
	{@render children()}
</main>
