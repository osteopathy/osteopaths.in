<script lang="ts">
	import { buttonVariants, type ButtonVariant, type ButtonSize } from "$lib/components/ui/button";
	import Overlay from "./root/dialog-overlay.svelte";
	import { Dialog } from "bits-ui";
	import { Drawer } from "vaul-svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import { type Snippet } from "svelte";
	const isMobile = new IsMobile();

	let {
		title,
		description,
		children,
		variant,
		size
	}: {
		title: Snippet;
		description: Snippet;
		children: Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
	} = $props();
	const direction = "border-b-none fixed right-0 bottom-0 left-0";
</script>

{#if !isMobile.current}
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant, size })}>open</Dialog.Trigger>
		<Dialog.Portal>
			<Overlay class="bg-layer-0/80 fixed inset-0 z-10" />
			<Dialog.Content
				class="fixed top-1/2 left-1/2 z-10 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 border p-5 outline-hidden sm:max-w-[490px] md:w-full"
			>
				<Dialog.Title>
					{@render title()}
				</Dialog.Title>
				<Dialog.Description>
					{@render description()}
				</Dialog.Description>
				{@render children?.()}
				<Dialog.Close>Close Dialog</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{:else}
	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant, size })}>Open</Drawer.Trigger>
		<Drawer.Portal>
			<Drawer.Content
				class="{direction} bg-background z-10 mx-[-1px] flex h-[80%] max-h-[97%] flex-col rounded-t-[10px]"
			>
				<Drawer.Title>
					{@render title()}
				</Drawer.Title>
				<Drawer.Description>
					{@render description()}
				</Drawer.Description>
				{@render children?.()}
				<Drawer.Close>Close Dialog</Drawer.Close>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
{/if}
<!-- <ExampleDialog>
	{#snippet title()}
		Fill The Example Dialog
	{/snippet}
	{#snippet description()}
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, debitis.
	{/snippet}
	asd
</ExampleDialog> -->
