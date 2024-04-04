<script lang="ts">
	import { ArrowRightIcon, MailIcon } from 'lucide-svelte';
</script>

<div class="flex w-full max-w-screen-2xl flex-col items-center px-2 py-10">
	<h1 class="text-layer-11 mb-12 text-4xl font-black">Get in touch</h1>
	<div class="flex flex-col">
		<div class="bg-layer-0 flex flex-col items-start rounded-lg p-4">
			<h2 class="text-layer-11 mb-2 inline-flex gap-x-2 sm:text-lg">
				<MailIcon /> <span>Email Support</span>
			</h2>
			<p class="text-layer-12 mb-1 pl-8 text-lg sm:text-xl">
				Prefer to Email? send us an email and we will get back to you soon.
			</p>
			<a href="mailto:peadevp@gmail.com">
				<span
					class="text-layer-13 inline-flex items-center pl-8 text-base underline underline-offset-4 sm:text-lg"
				>
					<span>send now</span>
					<ArrowRightIcon size={20} />
				</span>
			</a>
		</div>
	</div>
</div>
