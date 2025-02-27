<script lang="ts">
	let { children } = $props();
</script>

<h1 class="pb-2 text-3xl font-semibold tracking-tight">
	{@render children()}
</h1>
