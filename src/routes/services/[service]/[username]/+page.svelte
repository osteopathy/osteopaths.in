<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import CalendarEditIcon from "$lib/icons/CalendarEditIcon.svelte";
	import AppShell from "../../AppShell.svelte";
	import type { PageData } from "./$types";
	import SubscribeButton from "./subscribe-button.svelte";

	let { data }: { data: PageData } = $props();
	const getEndAt = (startAt: string, duration: string) => {
		let [hour, minute] = startAt.split(":").map(Number);
		const addMinute = +duration;
		minute += addMinute;
		hour += Math.floor(minute / 60);
		minute %= 60;
		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
	};
	// checking for if the date is today or tommorow and displaying accordingly
	// const display = (date: Date) => {}
	const friendlyDate = (date: Date | null) => {
		if (!date) return "";
		const today = new Date();

		if (today.toDateString() === date.toDateString()) {
			return "Today";
		} else if (today.setDate(today.getDate() + 1) === date.setDate(date.getDate())) {
			return "Tomorrow";
		}

		return date.toLocaleDateString("en", { dateStyle: "full" });
	};
	let subscribed = $state(data.isSubscribed);
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
				<div class="flex w-full flex-wrap justify-between gap-x-2">
					<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
						<span class="text-foreground text-lg">{date}</span>
						<span class="text-foreground text-lg">{appointment?.location}</span>
					</div>
					<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
						<span class="text-foreground text-lg">{startAt} - {endAt}</span>
						<Button size="xs">Request</Button>
					</div>
				</div>
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
