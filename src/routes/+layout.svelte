<script lang="ts">
	import { pwaInfo } from "virtual:pwa-info";
	import { pwaAssetsHead } from "virtual:pwa-assets/head";

	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import NotepadIcon from "$lib/icons/NotepadIcon.svelte";
	import PersonIcon from "$lib/icons/PersonIcon.svelte";
	let { children } = $props();
	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	<!-- eslint-disable-next-line -->
	{@html webManifest}
</svelte:head>

<ModeWatcher />
{@render children()}
<nav class="border-border bg-background fixed bottom-0 flex w-full max-w-xl border-t">
	<a
		aria-current={page.url.pathname === "/app/service" && "page"}
		href="/app/service"
		class="group aria-[current='page']:bg-muted aria-[current]:text-foreground relative flex w-full flex-col items-center justify-center p-2"
	>
		<NotepadIcon class="size-8" />
		<span class="text-sm font-medium">Appointments</span>
	</a>
	<a
		aria-current={page.url.pathname === "/app" && "page"}
		href="/app"
		class="group aria-[current='page']:bg-muted aria-[current='page']:text-foreground relative flex w-full flex-col items-center justify-center p-2"
	>
		<PersonIcon class="size-8" />
		<span class="text-sm font-medium">Profile</span>
	</a>
</nav>
{#await import('$lib/components/pwa/pwa-badge.svelte') then { default: PWABadge }}
	<PWABadge />
{/await}
