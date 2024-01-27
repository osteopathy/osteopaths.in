<script>
	import Logo from '$lib/components/logo.svelte';
	import ThemeButton from '$lib/components/theme-button.svelte';
	import '../app.pcss';
</script>

<header class="mb-10 flex w-full max-w-5xl items-center justify-between">
	<div class="inline-flex items-center gap-x-2 px-2 py-1">
		<Logo size={32} />
		<span class="text-xl font-medium">V2O</span>
	</div>
	<div class="flex items-center gap-x-4 rounded-full border px-2 py-2">
		<ThemeButton />
		<nav class="flex gap-x-3 pr-2">
			<a href="/">Home</a>
			<a href="/about-us">About Us</a>
		</nav>
	</div>
	<div class="hidden sm:block">
		<a href="/contact-us">Contact Us</a>
	</div>
</header>
<slot />
<footer></footer>
