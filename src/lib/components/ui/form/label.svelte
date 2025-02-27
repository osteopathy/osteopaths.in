<script lang="ts">
	import { Label } from "bits-ui";

	let { ref = $bindable(null), class: className, ...restProps }: Label.RootProps = $props();
</script>

<Label.Root
	class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 {className}"
	bind:ref
	{...restProps}
/>
