<script lang="ts" generics="T extends ZodSchema">
	import { superForm, type Infer, type InferIn, type SuperValidated } from "sveltekit-superforms";
	import type { ZodSchema } from "zod";
	import type { Snippet } from "svelte";
	import { fromStore } from "svelte/store";

	let {
		data,
		form: formSnippet,
		action,
		emebed,
		onComplete
	}: {
		schema: T;
		action: string;
		emebed: Partial<Infer<T>>;
		data: SuperValidated<Infer<T>, { status: number; text: string }, InferIn<T>>;
		form: Snippet<
			[
				{ field: typeof field; loading: typeof loading; errors: typeof errors },
				{ input: typeof input }
			]
		>;
		onComplete?: () => void;
	} = $props();

	const {
		form: f,
		errors: e,
		enhance,
		delayed
	} = superForm(data, {
		onUpdated({ form }) {
			console.log("UPDATED");
			if (form.valid) {
				if (onComplete) onComplete();
			}
		}
	});

	let form = $state(fromStore(f).current);
	let loading = $state(fromStore(delayed).current);
	let errors = $state(fromStore(e).current);

	f.subscribe((v) => {
		form = v;
	});

	delayed.subscribe((v) => {
		loading = v.valueOf();
	});

	e.subscribe((v) => {
		errors = v;
	});

	function update(key: keyof Infer<T>) {
		return (v: Infer<T>[keyof Infer<T>]) => f.update((i) => ({ ...i, [key]: v }));
	}

	function get(key: keyof Infer<T>) {
		return () => form[key];
	}

	function field(key: keyof Infer<T>, value?: string) {
		if (value) {
			f.update((i) => ({ ...i, [key]: value }));
		}
		return {
			name: key as string,
			get: get(key),
			update: update(key),
			value: get(key)
		};
	}
</script>

{#snippet input(fieldkey: keyof Infer<T>, type: "text" | "time" = "text")}
	{@const prop = field(fieldkey)}
	<input
		{type}
		name={String(prop.name)}
		id={String(prop.name)}
		autocomplete="given-name"
		bind:value={prop.get, prop.update}
		class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset aria-[invalid='true']:bg-red-500 sm:text-sm sm:leading-6"
	/>
{/snippet}

<form {action} method="POST" use:enhance>
	{#each Object.keys(emebed) as Array<Omit<keyof typeof emebed, number | symbol>> as key, i (i + key)}
		<input type="hidden" name={key} value={emebed[key]} />
	{/each}
	{@render formSnippet({ field, loading, errors }, { input })}
</form>
