<script lang="ts">
	export let data;
</script>

<main class="w-full max-w-screen-2xl">
	<img class="size-32 rounded-full" src={data.image} alt="Anisha Profile Pic" />
	<h2 class="mt-4 text-4xl">{data.name}</h2>
	<p class="mt-2 text-2xl">
		{data.short_bio}
	</p>
</main>
