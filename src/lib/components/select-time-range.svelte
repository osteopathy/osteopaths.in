<script lang="ts" module>
	// for experimenting created svelte playground
	// https://svelte.dev/playground/hello-world?version=5.21.0#H4sIAAAAAAAAE41VwW7bMAz9FUJrUXlxnLQDis2JM_QwYJduh-5WF6gSM4kwRzYkumsR-N8HSXZspxmyU2Ty8fGRIpU9U2KHLGYGc1zRmOQOWcjWMkfD4sc9o7fSuq2BhS34riwj84I5WdtSGDxlXxWKUJFhMZublZYlQS7UJkkZmZTBrsiqHBepSmlVKEOwQfoldwgJcKnKimIwpKXaBJAsYG9xLfJxW1Q6hJ1UFeETJODwkSlzSTxlccqCaCdK_qPaLVEHPlQjVVq1RCn1Obyttj_1QNDPkmShjNVkSGi6oxBQZfZnI8oQskoLi-hrzJFAaA0JPD7N-rIdw_eisq6GLbIqBiBUWQNxed4DXOS9VD0SX8Qxjcd4lhMIKkjkNpXxKJd13Il8D753JK4ZvBf9EW6nQRt5L1UAoyb9rGvItld2j926vLbWOQwrUWVSbbrMfSEzmEzsNcAS6Q-iAh-3LjRwGyxVhq-QwHTWHOcJ3AvaRuu8KDQf1OSIggY4GgXdnAito7IyW_58sbdVRFQ8uLnkQVSK7MGK5jchpGyasqCOL_a-oDO452DWZvD4UbIR5cF2VPg4gb5XrrkPWiS29wetfqpHyXVnaLp7mcDttLXWHQ_wo0zz3kz3eJcaxe_ZEUE92Cyh_a3WqZpP_MIvUnVi9d3O2wtq5hcSuDAkCHnzBPCr68_xdHoV-B5ZqBvjU8AvR8BWfYf9NO28dlpOOorDol9kqOULZrxb_zO737H4RxT9Zff1tgUd57vpJYyWb5y_f-zIv4ltxUcpgsGaajRVTh7dam_I7GDEjqx5DGDU9WphpwO-erdb1RFcQ9x9h57ER56l4fw0IIBL91b8i8BlqUPfZNvj6fDt9uU50PuefxtOiAX0xtAOogPCUqosfhF5hcn-qJk1yCxJmbvtsaCUgf1fG1jc7O4_oFhtDzMjTHNs9mHuv6BJ0vgW7WE-8QdPNbFUfmWcmLNaXZ2NUlTZQGf7fULlzb9k_r8uFjLCV2Ix6Qrrp_ovW7zCmjwIAAA=
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
		let arr = [];
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
	let { from, to } = $props();
	let startAt = $state(getTime(from));
	let endAt = $state(getTime(to));
	let duration = $state(30);
	let gap = $state(30);
	let options = $derived(getOptions(startAt, endAt, gap, duration));
	let selectedStartAt = $state(from);
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
	let selectedEndAt = $state();
</script>

<div class="my-2 flex gap-x-2">
	<div class="flex flex-col gap-y-2">
		<Label for="start-at">From</Label>
		<div class="grid grid-cols-1">
			<select
				bind:value={selectedStartAt}
				id="start-at"
				name="start-at"
				class="border-input col-start-1 row-start-1 w-full appearance-none rounded-md border py-1.5 pr-8 pl-3 text-base sm:text-sm/6"
			>
				{#each options as option}
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
		<Label for="end-at">To</Label>
		<div class="grid grid-cols-1">
			<select
				bind:value={selectedEndAt}
				id="end-at"
				name="end-at"
				class="border-input col-start-1 row-start-1 w-full appearance-none rounded-md border py-1.5 pr-8 pl-3 text-base sm:text-sm/6"
			>
				{#each options2 as option}
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
</div>
