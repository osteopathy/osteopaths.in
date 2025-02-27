<script lang="ts">
	import type { ButtonSize } from "$lib/components/ui/button";
	import type { ButtonVariant } from "$lib/components/ui/button";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	const variants = Object.keys(buttonVariants.variants.variant) as ButtonVariant[];
	const sizes = Object.keys(buttonVariants.variants.size) as ButtonSize[];
</script>

<div class="grid gap-20 p-6 sm:grid-cols-2 sm:p-20">
	{#each variants as variant}
		<div class="bg-layer-2 border-layer-6 rounded-md border-2 p-4">
			<h2 class="mb-2 text-xl">{variant}</h2>
			<div class="flex flex-wrap gap-4">
				{#each sizes as size}
					<div class="">
						<h2 class="">{size}</h2>
						<Button {variant} {size}>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M6.25 3h11.5a3.25 3.25 0 0 1 3.245 3.066L21 6.25v11.5a3.25 3.25 0 0 1-3.066 3.245L17.75 21H6.25a3.25 3.25 0 0 1-3.245-3.066L3 17.75V6.25a3.25 3.25 0 0 1 3.066-3.245zh11.5zM4.5 14.5v3.25a1.75 1.75 0 0 0 1.606 1.744l.144.006h11.5a1.75 1.75 0 0 0 1.744-1.607l.006-.143V14.5h-3.825a3.75 3.75 0 0 1-3.475 2.995l-.2.005a3.75 3.75 0 0 1-3.632-2.812l-.043-.188zv3.25zm13.25-10H6.25a1.75 1.75 0 0 0-1.744 1.606L4.5 6.25V13H9a.75.75 0 0 1 .743.648l.007.102a2.25 2.25 0 0 0 4.495.154l.005-.154a.75.75 0 0 1 .648-.743L15 13h4.5V6.25a1.75 1.75 0 0 0-1.607-1.744z"
								/></svg
							>
							{#if size !== "icon"}
								Click Me
							{/if}
						</Button>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
