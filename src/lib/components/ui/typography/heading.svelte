<script lang="ts">
	let { children } = $props();
</script>

<h2 class="text-2xl font-semibold tracking-tight">
	{@render children()}
</h2>
