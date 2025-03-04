<script lang="ts">
	import { page } from "$app/state";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import CalendarEditIcon from "$lib/icons/CalendarEditIcon.svelte";
	import {
		appointmentdetails,
		friendlyDate,
		getEndAt
	} from "$lib/snippets/appointment-details.svelte";
	import { Popover } from "bits-ui";
	import AppShell from "../../AppShell.svelte";
	import type { PageData } from "./$types";
	import SubscribeButton from "./subscribe-button.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import SelectTimeRange from "$lib/components/select-time-range.svelte";
	let isSM = new IsMobile();
	let { data }: { data: PageData } = $props();
</script>

<AppShell
	class="mt-4 flex flex-col items-center gap-y-6"
	back="/services/{page.params.service}"
	heading="Osteopath"
>
	<Avatar
		class="size-56"
		src={data.serviceProvider?.user.picture}
		alt="{data.serviceProvider?.user.name} Profile Image"
		fallback={(data.serviceProvider?.user.name ?? "US").substring(0, 2)}
	/>
	<div class="flex w-full flex-col items-center gap-y-2 px-2.5 text-center sm:px-12">
		<h2 class="text-foreground text-2xl font-medium">
			{data.serviceProvider?.user.name}
		</h2>
		<p class="text-muted-foreground w-full min-w-0 overflow-auto text-lg font-medium">
			{data.serviceProvider?.user.universityMail}
		</p>
	</div>
	<div class="mt-8 px-2.5">
		<div class="mb-8 flex justify-between">
			<h2 class="flex items-center gap-x-2 text-xl">
				<span><CalendarEditIcon /></span>
				<span>Slots</span>
			</h2>
			{#if data.serviceProvider?.id}
				<SubscribeButton
					service_provider_id={data.serviceProvider?.id}
					bind:subscribed={data.isSubscribed}
				/>
			{/if}
		</div>
		<div class="mt-4 flex w-full flex-col gap-y-4 sm:mt-0 sm:gap-y-2">
			{#each data.serviceProvider?.appointments ?? [] as appointment}
				{@const date = friendlyDate(appointment.date)}
				{@const startAt = appointment.startAt}
				{@const endAt = getEndAt(appointment.startAt ?? "00:00", appointment.duration ?? "30")}
				{#snippet button()}
					<Popover.Root>
						<Popover.Trigger class={buttonVariants({ variant: "default", size: "xs" })}>
							Book
						</Popover.Trigger>
						<Popover.Content
							align={isSM.current ? "end" : "center"}
							side={isSM.current ? "top" : "bottom"}
							class="bg-layer-3 max-w-xs rounded-2xl px-4 pt-4 pb-5"
						>
							<Popover.Arrow class="text-layer-10" />
							<h2 class="text-xl">Predefine your availability</h2>
							<p class="">
								To ensure better convenience for you, accordingly time-slots will be assigned to
								you.
							</p>
							<SelectTimeRange from={startAt} to={endAt} />
							<Button class="mt-2" size="sm">Submit</Button>
						</Popover.Content>
					</Popover.Root>
				{/snippet}
				{@render appointmentdetails(
					{ date, location: appointment.location, startAt, endAt },
					button
				)}
			{/each}
			{#if data.serviceProvider?.appointments?.length === 0}
				<p class="text-muted-foreground text-lg">No appointments available.</p>
			{/if}
			<!-- {#each [{ date: "Today", location: "Shruti 2nd Floor 201", timings: "10:00 AM - 11:00 AM" }, { date: "Today", location: "Shruti 1st Floor 113", timings: "03:00 PM Onwards" }] as appointment}
				<div class="flex flex-wrap justify-between gap-x-2">
					<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
						<span class="text-foreground text-lg">{appointment.date}</span>
						<span class="text-foreground text-lg">{appointment.location}</span>
					</div>
					<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
						<span class="text-foreground text-lg">{appointment.timings}</span>
						<Button size="xs">Request</Button>
					</div>
				</div>
			{/each} -->
		</div>
	</div>
</AppShell>
