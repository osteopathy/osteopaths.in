<script lang="ts">
	import jobs from './data';
	import { ArrowRightIcon } from 'lucide-svelte';
</script>

<main class="w-full max-w-4xl">
	<h1 class="mb-4">
		<span
			class="bg-gradient-to-tr from-blue-500 to-sky-300 bg-clip-text text-8xl font-extrabold text-transparent"
		>
			Join us
		</span>
	</h1>
	<h2 class="text-layer-11 text-4xl font-bold">Let's Built & Learn<br /> Software Engineering!</h2>
	<ul class="mt-14 flex flex-col gap-y-14">
		{#each Object.keys(jobs) as category}
			<div class="">
				<h3 class="text-3xl font-semibold">{category}</h3>
				<ul class="mt-6 flex flex-wrap gap-12 pl-4">
					{#each jobs[category] as job}
						<li class="bg-secondary inline-flex items-center gap-x-12 rounded-lg px-3 py-1">
							<h3 class="text-2xl">{job.label}</h3>
							<a href="#" class="inline-flex items-center gap-x-2">
								Apply <ArrowRightIcon />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</ul>
</main>
