<script lang="ts" module>
	import type { Snippet } from "svelte";
	const getEndAt = (startAt: string, duration: string) => {
		let [hour, minute] = startAt.split(":").map(Number);
		const addMinute = +duration;
		minute += addMinute;
		hour += Math.floor(minute / 60);
		minute %= 60;
		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
	};
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

	export { appointmentdetails, getEndAt, friendlyDate };
</script>

{#snippet appointmentdetails(
	details: { date: string; location: string | null; startAt: string | null; endAt: string },
	button: Snippet
)}
	<div class="flex w-full flex-wrap justify-between gap-x-2">
		<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
			<span class="text-foreground text-lg">{details.date}</span>
			{#if details.location}
				<span class="text-foreground text-lg">{details.location}</span>
			{:else}
				<span></span>
			{/if}
		</div>
		<div class="flex w-full items-center justify-between gap-x-4 sm:w-max">
			<span class="text-foreground text-lg">{details.startAt} - {details.endAt}</span>
			{@render button()}
		</div>
	</div>
{/snippet}
