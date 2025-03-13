<script lang="ts" module>
	// const getEndAt = (startAt: string, duration: string) => {
	// 	let [hour, minute] = startAt.split(":").map(Number);
	// 	const addMinute = +duration;
	// 	minute += addMinute;
	// 	hour += Math.floor(minute / 60);
	// 	minute %= 60;
	// 	return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
	// };
	function addDays(date: Date, days: number): Date {
		const newDate = new Date(date); // Create a copy to avoid modifying the original
		newDate.setDate(newDate.getDate() + days);
		return newDate;
	}
	const friendlyDate = (date: Date | null) => {
		if (!date) return "";
		const today = new Date();
		if (today.toDateString() === date.toDateString()) {
			return "Today";
		} else if (addDays(today, 1).toDateString() === date.toDateString()) {
			return "Tomorrow";
		}

		const [month, day] = date
			.toLocaleDateString("en", { month: "long", day: "2-digit" })
			.split(" ");
		return ordinal(Number(day)) + " " + month;
	};
</script>

<script>
	import { page } from "$app/state";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import AppShell from "../../../AppShell.svelte";
	import { Accordion, Popover } from "bits-ui";
	import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import { bookAppointmentSchema, scheduleSchema } from "./schema";
	import { route } from "$lib/routes_helper";
	import FormAction from "$lib/snippets/form-action.svelte";
	import SelectTimeRange from "$lib/components/select-time-range.svelte";
	import Label from "$lib/components/ui/form/label.svelte";
	import Input from "$lib/components/ui/form/input.svelte";
	import { ordinal } from "$lib/utils/ordinal";
	let { data } = $props();
	let isSchedulePopoverOpen = $state(false);
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

{#snippet accordionheader(name: string, { startAt, endAt }: { startAt: string; endAt: string })}
	<Accordion.Header>
		<Accordion.Trigger
			class="flex w-full flex-1 items-center justify-between px-2.5 py-3 transition-all select-none sm:py-5 [&[data-state=open]>span>span>svg]:rotate-180"
		>
			<h2 class="text-left text-xl sm:text-2xl">{name}</h2>
			<div class="flex items-center gap-x-2">
				<div class="flex gap-x-1 text-lg font-medium">
					{@render timeblock(startAt, endAt)}
				</div>
				<span
					class="hover:bg-accent inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
				>
					<ChevronDownIcon class="size-8 transition-transform duration-200" />
				</span>
			</div>
		</Accordion.Trigger>
	</Accordion.Header>
{/snippet}

{#snippet schedule()}
	<div></div>
	<Popover.Root bind:open={isSchedulePopoverOpen}>
		<Popover.Trigger class={buttonVariants({ variant: "secondary", class: "absolute right-4" })}>
			Schedule
		</Popover.Trigger>
		<Popover.Content
			align="end"
			side="bottom"
			class="bg-layer-3 z-20 max-w-xs rounded-2xl px-4 pt-4 pb-5"
		>
			<Popover.Arrow class="text-layer-10" />
			<FormAction
				emebed={{}}
				action={route("newschedule /services/[service]/[service_provider_id]/requests", {
					service: page.params.service,
					service_provider_id: page.params.service_provider_id
				})}
				onComplete={() => {
					isSchedulePopoverOpen = false;
				}}
				schema={scheduleSchema}
				data={data.scheduleForm}
			>
				{#snippet form({ loading })}
					<div class="flex w-max flex-col gap-y-2">
						<Label for="date">Date</Label>
						<Input
							min={addDays(new Date(), 1).toISOString().split("T").at(0)}
							value={addDays(new Date(), 1).toISOString().split("T").at(0)}
							max={addDays(new Date(), 8).toISOString().split("T").at(0)}
							id="date"
							name="date"
							type="date"
						/>
					</div>
					<SelectTimeRange onwards from="08:00" to="20:00" />
					<Button class="mt-2" disabled={loading} type="submit" size="sm">Submit</Button>
				{/snippet}
			</FormAction>
		</Popover.Content>
	</Popover.Root>
{/snippet}

<AppShell
	class="mt-4 flex flex-col items-center gap-y-6"
	back="/services/{page.params.service}/{page.params.service_provider_id}"
	heading="Schedule & Requests"
	action={schedule}
>
	<div class="w-full px-2.5">
		{#each data.dateschedule as dateschedule, index (index)}
			<Accordion.Root
				value={data.dateschedule.slice(0, 2).map((v) => friendlyDate(v.date))}
				class="w-full"
				type="multiple"
			>
				<Accordion.Item value={friendlyDate(dateschedule.date)} class="border-border border-b">
					{@render accordionheader(friendlyDate(dateschedule.date), {
						startAt: dateschedule.startAt,
						endAt: dateschedule.endAt
					})}
					<Accordion.Content
						class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
					>
						<div class="mt-4 pb-10">
							{#each dateschedule.requests as request, index (index)}
								<div class="flex flex-wrap justify-between">
									<div class="flex items-center gap-x-4">
										<Avatar
											class="size-14"
											src={request?.user?.picture}
											alt="{request?.user?.name} Profile Image"
											fallback={(request?.user?.name ?? "US").substring(0, 2)}
										/>
										<div>
											<h2 class="text-lg">{request?.user?.name}</h2>
											<p>{request?.note ? request.note : request.user?.universityMail}</p>
										</div>
									</div>
									<div class="flex flex-col items-end justify-between">
										<div class="flex gap-x-1 text-lg/6">
											{@render timeblock(request.startAt, request.endAt)}
										</div>
										<Popover.Root>
											<Popover.Trigger class={buttonVariants({ size: "xs" })}>
												confirm
											</Popover.Trigger>
											<Popover.Content
												align="end"
												side="bottom"
												class="bg-layer-3 z-20 max-w-xs rounded-2xl px-4 pt-4 pb-5"
											>
												<Popover.Arrow class="text-layer-10" />
												<FormAction
													size="xs"
													action={route(
														"bookappointment /services/[service]/[service_provider_id]/requests",
														{
															service: page.params.service,
															service_provider_id: page.params.service_provider_id
														}
													)}
													emebed={{
														user_id: request.userId,
														date: request.date,
														appointment_request_id: request.id
													}}
													schema={bookAppointmentSchema}
													data={data.bookappointment}
												>
													{#snippet form({ loading })}
														<SelectTimeRange from={request.startAt} to={request.endAt} />
														<Button class="mt-2" disabled={loading} type="submit" size="sm">
															Submit
														</Button>
													{/snippet}
												</FormAction>
											</Popover.Content>
										</Popover.Root>
									</div>
								</div>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		{/each}
	</div>
</AppShell>
