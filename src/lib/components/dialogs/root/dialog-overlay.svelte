<script lang="ts">
	import { Dialog, type WithoutChildrenOrChild } from "bits-ui";
	import { fade } from "svelte/transition";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		duration = 200,
		children,
		...restProps
	}: WithoutChildrenOrChild<Dialog.OverlayProps> & {
		duration?: number;
		children?: Snippet;
	} = $props();
</script>

<Dialog.Overlay class="bg-layer-1/80 fixed inset-0 z-10" forceMount bind:ref {...restProps}>
	{#snippet child({ props, open })}
		{#if open}
			<div {...props} transition:fade={{ duration }}>
				{@render children?.()}
			</div>
		{/if}
	{/snippet}
</Dialog.Overlay>
