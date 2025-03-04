<script lang="ts">
	import { page } from "$app/state";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import ArrowRightIcon from "$lib/icons/ArrowRightIcon.svelte";
	import AppShell from "../AppShell.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<AppShell back="/app/service" heading="Osteopaths" class="mt-4">
	<div class="flex w-full items-start gap-x-3 px-2.5 sm:gap-x-6">
		{#each data.serviceProviderList as serviceProvider}
			<a
				href="/services/{page.params.service}/{serviceProvider.username}"
				class="bg-muted group hover:bg-layer-4 flex w-full items-start justify-between gap-x-3 rounded-lg p-3"
			>
				<Avatar
					class="size-14"
					src={serviceProvider.user.picture}
					alt="@{serviceProvider.username}"
					fallback={(serviceProvider.user.name ?? " . ").substring(0, 2)}
				/>
				<div class="flex w-full flex-col overflow-auto">
					<h3 class="text-foreground w-full text-xl font-medium">{serviceProvider.user.name}</h3>
					<p class="text-muted-foreground w-0 min-w-0 text-lg font-medium">
						{serviceProvider.user.universityMail}
					</p>
				</div>
				<ArrowRightIcon class="size-7" />
			</a>
		{/each}
	</div>
</AppShell>
