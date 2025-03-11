<script lang="ts" generics="T extends ZodSchema">
	import { buttonVariants, type ButtonProps } from "$lib/components/ui/button";
	import { superForm, type Infer, type InferIn, type SuperValidated } from "sveltekit-superforms";
	import type { ZodSchema } from "zod";
	import type { Snippet } from "svelte";
	import { fromStore } from "svelte/store";
	import { Button } from "bits-ui";

	let {
		data,
		action,
		emebed,
		child,
		children,
		variant = "default",
		size = "default",
		class: className,
		schema,
		...restProps
	}: {
		schema: T;
		emebed: Infer<T>;
		action: string;
		data: SuperValidated<Infer<T>, { status: number; text: string }, InferIn<T>>;
		children?: Snippet;
		child?: Snippet<[typeof loading]>;
	} & Omit<ButtonProps, "type"> = $props();

	const { enhance, delayed, submitting } = superForm(data);

	let loading = $state(fromStore(delayed).current);

	submitting.subscribe((v) => {
		loading = v.valueOf();
	});
</script>

<form {action} method="POST" use:enhance>
	{#each Object.keys(emebed) as Array<Omit<keyof typeof emebed, number | symbol>> as key, i (i + key)}
		<input type="hidden" name={key} value={emebed[key]} />
	{/each}
	<Button.Root
		disabled={$submitting}
		type="submit"
		class={buttonVariants({ variant, size, className: className?.toString() })}
		{...restProps}
	>
		{#if child}
			{@render child?.(loading)}
		{/if}
		{@render children?.()}
	</Button.Root>
</form>
