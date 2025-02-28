<script lang="ts">
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button from "./ui/button/button.svelte";

	let {
		service_provider,
		date,
		startAt,
		endAt,
		location,
		status,
		format
	}: {
		service_provider: {
			name: string;
			image: string;
			username: string;
		};
		date: string;
		startAt: string;
		endAt?: string;
		location: string;
		status: "confirmed" | "requested" | "idle";
		format: "structured" | "casual" | "card";
	} = $props();
</script>

{#snippet timeblock(startAt: string, endAt?: string)}
	{#if endAt}
		<span>{startAt}</span>
		<span>to</span>
		<span>{endAt}</span>
	{:else}
		<span>{startAt}</span>
		<span>onwards</span>
	{/if}
{/snippet}
{#snippet actionButton()}
	{#if status === "confirmed"}
		<Button size="xs" disabled>Update</Button>
	{:else if status === "requested"}
		<Button size="xs" disabled>Edit</Button>
	{:else}
		<Button size="xs" disabled>Book</Button>
	{/if}
{/snippet}

{#if format === "structured"}
	<div class="flex w-full items-center gap-x-4">
		<Avatar
			src={service_provider.image}
			alt={service_provider.username}
			fallback={service_provider.name.substring(0, 2)}
		/>
		<div class="flex w-full flex-col whitespace-nowrap">
			<div class="flex w-full justify-between">
				<h2 class="text-xl">
					{service_provider.name}
				</h2>
				{@render actionButton()}
			</div>
			<div class="flex w-full justify-between">
				<div class="flex gap-x-1">
					<span class="text-base">Date</span>
				</div>
				<div class="flex gap-x-1">
					<span class="text-base">{date}</span>
				</div>
			</div>
			<div class="flex w-full justify-between">
				<div class="flex gap-x-1">
					<span class="text-base">Timings</span>
				</div>
				{@render timeblock(startAt, endAt)}
			</div>
			<div class="flex w-full justify-between">
				<div class="flex gap-x-1">
					<span class="text-base">Location</span>
				</div>
				<div class="flex gap-x-1">
					<span class="text-base">{location}</span>
				</div>
			</div>
		</div>
	</div>
{:else if format === "casual"}
	<div class="flex w-full items-center gap-x-4">
		<Avatar
			src={service_provider.image}
			alt={service_provider.username}
			fallback={service_provider.name.substring(0, 2)}
		/>
		<div class="flex w-full flex-col whitespace-nowrap">
			<div class="flex w-full justify-between">
				<h2 class="text-xl">
					{service_provider.name}
				</h2>
				{@render actionButton()}
			</div>
			<div>
				{date} | {@render timeblock(startAt, endAt)} | {location}
			</div>
		</div>
	</div>
{:else if format === "card"}
	<div class="flex w-max flex-col items-center gap-x-2">
		<Avatar
			src={service_provider.image}
			alt={service_provider.username}
			fallback={service_provider.name.substring(0, 2)}
		/>
		<div class="flex w-full flex-col whitespace-nowrap">
			<div class="flex w-full justify-between">
				<h2 class="text-xl">
					{service_provider.name}
				</h2>
			</div>
			{@render actionButton()}
			<div class="flex w-full justify-between">
				<div class="flex gap-x-1">
					<span class="text-base">Date</span>
				</div>
				<div class="flex gap-x-1">
					<span class="text-base">{date}</span>
				</div>
			</div>
			<div class="flex w-full justify-between text-base">
				<div class="flex gap-x-1">
					<span class="">Timings</span>
				</div>
				{@render timeblock(startAt, endAt)}
			</div>
			<div class="flex w-full justify-between">
				<div class="flex gap-x-1">
					<span class="text-base">Location</span>
				</div>
				<div class="flex gap-x-1">
					<span class="text-base">{location}</span>
				</div>
			</div>
		</div>
	</div>
{/if}
