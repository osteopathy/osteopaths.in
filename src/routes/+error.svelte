<script>
	import Button from "$lib/components/ui/button/button.svelte";
</script>

<main
	class="bg-layer-2 grid w-full max-w-5xl place-items-center rounded-md px-6 py-24 sm:py-32 lg:px-8"
>
	<div class="text-center">
		<p class="text-base font-semibold text-indigo-600 dark:text-white">404</p>
		<h1 class="text-layer-12 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
		<p class="text-layer-11 mt-6 text-base leading-7">
			Sorry, we couldn't find the page you're looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button href="/">Go back home</Button>
		</div>
	</div>
</main>
