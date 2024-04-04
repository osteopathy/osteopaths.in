<script lang="ts">
	import { ArrowRightCircleIcon } from "lucide-svelte";
</script>

<svelte:head>
	<title>Osteopathy</title>
</svelte:head>

<main class="flex w-full max-w-screen-2xl flex-col">
	<h2
		class="max-w-7xl self-center text-balance text-center text-5xl font-extrabold tracking-wider sm:text-7xl md:text-8xl lg:text-9xl"
	>
		<!-- bg-gradient-to-r from-sky-500 from-10% via-blue-500 via-30% to-indigo-500 to-90% bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-400 dark:to-indigo-400 -->
		<i class="contents text-teal-500 selection:bg-teal-800">V2O&nbsp;</i><span
			class="contents text-teal-950 selection:bg-teal-400 dark:text-teal-200 dark:selection:bg-teal-600"
			>is software for Osteopaths</span
		>
	</h2>
	<section class="mt-12 max-w-sm px-4 sm:mt-16 md:mt-24 self-center">
		<h2 class="sr-only">Sign up for early access</h2>
		<form class="-mx-2 flex flex-wrap" name="Waitlist" data-netlify="true" data-netlify-recaptcha="true">
			<div class="mt-3 grow-[9999] basis-64 px-2">
				<div class="group relative overflow-hidden rounded-md sm:rounded-full p-0.5">
					<span
						class="-z-10 absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#06b6d4_50%,#10b981_100%)]"
					></span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						class="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-emerald-500 dark:text-teal-600 dark:group-focus-within:text-teal-400"
						><path
							d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"
						></path><path d="m6 7 6 5 6-5"></path></svg
					><input
						name="email_address"
						type="email"
						autocomplete="email"
						aria-label="Email address"
						required
						class="block z-20 w-full appearance-none rounded-md border border-transparent bg-white dark:bg-slate-950 py-2 pl-12 pr-3 leading-5 text-slate-900 shadow shadow-emerald-200 ring-1 ring-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-emerald-700/20 dark:text-white dark:placeholder-teal-500 dark:shadow-inner dark:shadow-emerald-900/20 dark:ring-emerald-200/50 dark:focus:ring-emerald-500 sm:rounded-full sm:text-sm"
						placeholder="xyz@domain.com"
					/>
				</div>
			</div>
			<div data-netlify-recaptcha="true"></div>
				<div class="mt-3 flex px-2 grow justify-end">
					<button type="submit" class="inline-flex gap-x-2 h-10 whitespace-nowrap sm:rounded-full rounded-md animate-shimmer items-center justify-center border border-teal-800 bg-[linear-gradient(110deg,#d1fae5,45%,#99f6e4,55%,#d1fae5)] dark:bg-[linear-gradient(110deg,#020617,45%,#1e293b,55%,#020617)] bg-[length:200%_100%] px-6 font-medium text-slate-950 dark:text-slate-300 dark:hover:text-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 dark:focus:ring-emerald-700 dark:focus:ring-offset-slate-900">
						<span>Join Waitlist</span>
						<ArrowRightCircleIcon/>
					  </button>
					<!-- <button
						type="submit"
						class="sm:rounded-full rounded-md whitespace-nowrap border-y border-transparent bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 dark:hover:bg-emerald-400"
						>Join Waitlist</button
					> -->
				</div>
		</form>
	</section>
	<div class="bg-teal-400"></div>
</main>