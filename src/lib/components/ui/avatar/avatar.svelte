<script lang="ts">
	import { Avatar, type WithoutChildrenOrChild } from "bits-ui";

	let {
		src,
		alt,
		fallback,
		ref = $bindable(null),
		imageRef = $bindable(null),
		fallbackRef = $bindable(null),
		class: className = "size-10",
		...restProps
	}: WithoutChildrenOrChild<Avatar.RootProps> & {
		src: string | null | undefined;
		alt: string | null | undefined;
		fallback: string;
		imageRef?: HTMLImageElement | null;
		fallbackRef?: HTMLElement | null;
		class?: string;
	} = $props();
</script>

<Avatar.Root
	class="relative flex shrink-0 overflow-hidden rounded-full {className}"
	{...restProps}
	bind:ref
>
	<Avatar.Image class="aspect-square h-full w-full" {src} {alt} bind:ref={imageRef} />
	<Avatar.Fallback
		class="bg-muted flex h-full w-full items-center justify-center rounded-full"
		bind:ref={fallbackRef}
	>
		{fallback}
	</Avatar.Fallback>
</Avatar.Root>
