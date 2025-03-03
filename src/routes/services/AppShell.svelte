<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";
	import ArrowLeftIcon from "$lib/icons/ArrowLeftIcon.svelte";
	let {
		children,
		heading,
		class: className,
		back
	}: {
		heading: string;
		children: Snippet;
		class?: string;
		back: string;
	} = $props();
</script>

<header class="relative flex w-full max-w-xl items-center justify-between px-2.5 py-4">
	<div></div>
	<Button href={back} size="icon" variant="link" class="absolute">
		<ArrowLeftIcon />
	</Button>
	{#if heading}
		<h1 class="text-lg font-bold">{heading}</h1>
	{/if}
	<div></div>
</header>
<main class="h-0 min-h-0 w-full max-w-xl shrink grow overflow-auto {className}">
	{@render children()}
</main>
