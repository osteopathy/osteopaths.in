<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowRight, Calendar } from 'radix-icons-svelte';

	const treatments = [
		{
			label: 'Headache'
		},
		{
			label: 'Stress'
		},
		{
			label: 'Back pain'
		},
		{
			label: 'Sports / joint injuries'
		},
		{
			label: 'Shoulder Pain'
		},
		{
			label: 'Neck Pain'
		},
		{
			label: 'Innate Immune System'
		},
		{
			label: 'Insominia'
		},
		{
			label: 'Cardiovascular Issue'
		}
	];
	export let data;
</script>

<svelte:head>
	<title>Osteopathy</title>
</svelte:head>

<main class="w-full max-w-5xl">
	<h2 class="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
		<span
			class="w-max bg-gradient-to-r from-sky-500 from-10% via-blue-500 via-30% to-indigo-500 to-90% bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-400 dark:to-indigo-400"
		>
			Osteopathy
		</span>
	</h2>
	<p class="text-muted-foreground mt-6 text-3xl sm:mt-12 sm:text-4xl md:text-5xl lg:text-6xl">
		It is based on the idea that all the body's systems are interrelated. Osteopaths focus on
		treating the whole person, find the root cause of problem.
	</p>
	<div class="mt-12 sm:mt-24">
		<h2 class="text-2xl md:text-3xl lg:text-4xl">We treat following conditions:</h2>
		<ul class="mt-6 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each treatments as treatment}
				<li
					class="bg-card text-card-foreground rounded-md border px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
				>
					<span class="font-medium"> {treatment.label} </span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="mt-8 flex flex-col gap-x-4 sm:mt-16 sm:flex-row">
		<Button size="lg" variant="default" class="items-center gap-x-2">
			<Calendar size={20} /> <span class="leading-4">Book Online</span>
		</Button>
		<Button href="/learn-more" size="lg" variant="outline" class="gap-x-2">
			Learn More <ArrowRight size={24} />
		</Button>
	</div>
</main>
