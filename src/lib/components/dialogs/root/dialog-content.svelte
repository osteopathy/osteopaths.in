<script lang="ts">
	import { Dialog, type WithoutChildrenOrChild } from "bits-ui";
	import type { Snippet } from "svelte";
	import DialogOverlay from "./dialog-overlay.svelte";
	import CloseIcon from "$lib/icons/CloseIcon.svelte";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<Dialog.ContentProps> & {
		portalProps?: Dialog.PortalProps;
		children: Snippet;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<DialogOverlay />
	<Dialog.Content
		bind:ref
		class="bg-background border-border fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border p-6 shadow-lg sm:rounded-lg {className}"
		{...restProps}
	>
		{@render children?.()}
		<Dialog.Close
			class="group ring-offset-background focus:ring-ring data-[state=open]:bg-muted data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none [&_svg]:size-6"
		>
			<CloseIcon />
			<span class="sr-only">Close</span>
		</Dialog.Close>
	</Dialog.Content>
</Dialog.Portal>
