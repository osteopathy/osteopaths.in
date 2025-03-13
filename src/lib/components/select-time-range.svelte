<script lang="ts" module>
	const getTime = (input: string) => {
		const [hour, minute] = input.split(":").map(Number);
		return {
			hour,
			minute
		};
	};

	const getOptions = (
		startAt: { hour: number; minute: number },
		endAt: { hour: number; minute: number },
		gap: number,
		duration: number
	) => {
		const arr: string[] = [];
		const startHour = startAt.hour;
		const endHour = endAt.hour;
		const startMin = startAt.minute;
		const endMin = endAt.minute;
		const totalHours = endHour - startHour;
		const totalMinutes = totalHours * 60 - startMin + endMin;
		let hour = startHour;
		let minute = startMin;
		let pendingMinutes = totalMinutes; // gap between
		for (let index = 0; index <= Math.floor(totalMinutes / gap); index++) {
			arr.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
			minute += gap;
			pendingMinutes -= gap;
			if (minute >= 60) {
				hour += 1;
				minute %= 60;
			}
			if (pendingMinutes < duration) {
				break;
			}
		}
		return arr;
	};
</script>

<script lang="ts">
	import Label from "./ui/form/label.svelte";
	let { from, to, onwards }: { from: string; to: string | null; onwards?: boolean } = $props();
	let startAt = $state(getTime(from));
	let endAt = $state(getTime(!to ? "20:00" : to));
	let duration = $state(30);
	let gap = $state(30);
	let selectedStartAt = $state(from);
	let selectedEndAt = $state();
	let options = $derived(getOptions(startAt, endAt, gap, duration));
	let options2 = $derived.by(() => {
		const time = getTime(selectedStartAt);
		const result = getOptions(
			{
				hour: time.minute + duration >= 60 ? time.hour + 1 : time.hour,
				minute:
					time.minute + duration >= 60 ? (time.minute + duration) % 60 : time.minute + duration
			},
			endAt,
			gap,
			0
		);
		return result;
	});
</script>

<div class="my-2 flex gap-x-2">
	<div class="flex flex-col gap-y-2">
		<Label for="start_at">From</Label>
		<div class="grid grid-cols-1">
			<select
				bind:value={selectedStartAt}
				id="start_at"
				name="start_at"
				class="border-input col-start-1 row-start-1 w-full appearance-none rounded-md border py-1.5 pr-8 pl-3 text-base sm:text-sm/6"
			>
				{#each options as option, index (index)}
					<option>{option}</option>
				{/each}
			</select>
			<svg
				class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end sm:size-4"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path
					fill-rule="evenodd"
					d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
	</div>
	<div class="flex flex-col gap-y-2">
		<Label for="end_at">To</Label>
		<div class="grid grid-cols-1">
			<select
				bind:value={selectedEndAt}
				id="end_at"
				name="end_at"
				class="border-input col-start-1 row-start-1 w-full appearance-none rounded-md border py-1.5 pr-8 pl-3 text-base sm:text-sm/6"
			>
				{#each options2 as option, index (index)}
					<option>{option}</option>
				{/each}
				{#if onwards}
					<option value="">onwards</option>
				{/if}
			</select>
			<svg
				class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end sm:size-4"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path
					fill-rule="evenodd"
					d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
	</div>
</div>
