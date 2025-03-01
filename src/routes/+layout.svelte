<script lang="ts">
	import { pwaInfo } from "virtual:pwa-info";
	import { pwaAssetsHead } from "virtual:pwa-assets/head";

	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
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

{#await import('$lib/components/pwa/pwa-badge.svelte') then { default: PWABadge }}
	<PWABadge />
{/await}
