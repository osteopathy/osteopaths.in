<script lang="ts" module>
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

<script lang="ts">
	import { Accordion, Popover } from "bits-ui";
	import AppShell from "../AppShell.svelte";
	import type { PageProps } from "./$types";
	import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import PlusIcon from "$lib/icons/PlusIcon.svelte";
	import { ordinal } from "$lib/utils/ordinal";
	import {
		type ServiceProviderAppointmentRequest,
		type ServiceProviderDateWiseSchedule,
		type User
	} from "$lib/database/schema";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import FormAction from "$lib/snippets/form-action.svelte";
	import SelectTimeRange from "$lib/components/select-time-range.svelte";
	import Input from "$lib/components/ui/form/input.svelte";
	import Label from "$lib/components/ui/form/label.svelte";
	import { route } from "$lib/routes_helper";
	import {
		createScheduleSchema,
		deleteScheduleSchema,
		updateScheduleSchema
	} from "../../../service_provider/schedule/schema";
	import CalendarEditIcon from "$lib/icons/CalendarEditIcon.svelte";
	import FormActionButton from "$lib/snippets/form-action-button.svelte";
	import DeleteIcon from "$lib/icons/DeleteIcon.svelte";
	import { acceptRequestSchema } from "../../../service_provider/request/schema";
	import LockOpenedIcon from "$lib/icons/LockOpenedIcon.svelte";
	import LockClosedIcon from "$lib/icons/LockClosedIcon.svelte";
	let { data }: PageProps = $props();
	let dateScheduleGroup = $derived(
		Object.groupBy(data.serviceProvider?.dateWiseScheduleList ?? [], (item) =>
			friendlyDate(item.date)
		)
	);
</script>

<AppShell userId={data.user.id} role={data.user.role ?? "user"}>
	{#snippet header()}
		<div class="text-xl font-medium">Dashboard</div>
		<div class="text-xl font-medium">
			{#await data.subscriptionCount}
				Loading
			{:then subscriptionCount}
				{subscriptionCount}
			{/await}
			Subscribed
		</div>
	{/snippet}
	<Accordion.Root value={["requests"]} class="w-full" type="multiple">
		<!-- <Accordion.Item value="appointments" class="border-border border-b">
			<Accordion.Header>
				<div
					class="flex w-full flex-1 items-center justify-between px-2.5 py-3 transition-all select-none sm:py-5"
				>
					<Accordion.Trigger class="w-full text-left text-2xl sm:text-3xl">
						Appointments
					</Accordion.Trigger>
					<div class="flex items-center gap-x-4">
						<Button size="icon" variant="secondary" class="group">
							<PlusIcon />
						</Button>
						<Accordion.Trigger
							class="group hover:bg-accent inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent [&[data-state=open]>span>svg]:rotate-180"
						>
							<ChevronDownIcon class="size-8 transition-transform duration-200" />
						</Accordion.Trigger>
					</div>
				</div>
			</Accordion.Header>
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="pb-4">
					{#each data.serviceProvider?.appointments ?? [] as appointment (appointment.id)}
						<li class="flex flex-wrap justify-between">
							<div class="flex items-center gap-x-4">
								<Avatar
									class="size-14"
									src={appointment?.user?.picture}
									alt="{appointment?.user?.name} Profile Image"
									fallback={(appointment?.user?.name ?? "US").substring(0, 2)}
								/>
								<div>
									<h2 class="text-lg">{appointment?.user?.name}</h2>
									<p>{appointment.user?.universityMail}</p>
								</div>
							</div>
							<div class="flex flex-col items-end justify-between">
								<div class="text-lg">
									{friendlyDate(appointment.date)}
								</div>
								<div class="flex gap-x-1 text-lg/6">
									{appointment.startAt} - {appointment.endAt}
								</div>
							</div>
						</li>
					{/each}
				</div>
			</Accordion.Content>
		</Accordion.Item> -->
		<Accordion.Item value="requests" class="border-border border-b">
			<Accordion.Header>
				<div
					class="flex w-full flex-1 items-center justify-between px-2.5 py-3 transition-all select-none sm:py-5"
				>
					<Accordion.Trigger class="w-full text-left text-2xl sm:text-3xl">
						Your Schedule
					</Accordion.Trigger>
					<div class="flex items-center gap-x-4">
						<Popover.Root>
							<Popover.Trigger class={buttonVariants({ variant: "secondary", class: "group" })}>
								<PlusIcon /> Schedule
							</Popover.Trigger>
							<Popover.Content
								align="end"
								side="bottom"
								class="bg-layer-3 z-20 max-w-xs rounded-2xl px-4 pt-4 pb-5"
							>
								<Popover.Arrow class="text-layer-10" />
								<FormAction
									emebed={{
										service_provider_id: data.serviceProvider?.id
									}}
									action={route("create /service_provider/schedule")}
									schema={createScheduleSchema}
									data={data.scheduleForms.create}
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
						<Accordion.Trigger
							class="group hover:bg-accent inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent [&[data-state=open]>span>svg]:rotate-180"
						>
							<ChevronDownIcon class="size-8 transition-transform duration-200" />
						</Accordion.Trigger>
					</div>
				</div>
			</Accordion.Header>
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="pb-4">
					{#each Object.keys(dateScheduleGroup) ?? [] as dateScheduleGroupName, index (index)}
						{@const dateScheduleList = dateScheduleGroup[
							dateScheduleGroupName
						] as (ServiceProviderDateWiseSchedule & {
							requests: (ServiceProviderAppointmentRequest & { user: User })[];
						})[]}
						<h2 class="mt-2 inline-block text-3xl">{dateScheduleGroupName}</h2>
						{#each dateScheduleList as dateSchedule (dateSchedule.id)}
							<div class="mt-2 flex w-full items-center justify-between gap-x-2">
								<h3 class="text-xl">{dateSchedule.startAt} - {dateSchedule.endAt}</h3>
								<div class="flex gap-x-4">
									<FormActionButton
										emebed={{
											id: dateSchedule.id,
											date: dateSchedule.date,
											start_at: dateSchedule.startAt,
											end_at: dateSchedule.endAt,
											disabled: !dateSchedule.disabled
										}}
										action={route("update /service_provider/schedule")}
										schema={updateScheduleSchema}
										data={data.scheduleForms.update}
										size="icon"
										variant={dateSchedule.disabled ? "outline" : "ghost"}
										class="group -mb-2"
									>
										{#if dateSchedule.disabled}
											<LockClosedIcon />
										{:else}
											<LockOpenedIcon />
										{/if}
									</FormActionButton>
								</div>
							</div>
							<ul class="mt-4 mb-6 flex flex-col gap-y-4">
								{#each dateSchedule.requests as request (request.id)}
									<li class="flex flex-wrap justify-between">
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
												{request.startAt} - {request?.endAt}
											</div>
											<Popover.Root>
												<Popover.Trigger class={buttonVariants({ size: "xs" })}>
													Accept
												</Popover.Trigger>
												<Popover.Content
													align="end"
													side="bottom"
													class="bg-layer-3 z-20 max-w-xs rounded-2xl px-4 pt-4 pb-5"
												>
													<Popover.Arrow class="text-layer-10" />
													<FormAction
														action={route("accept /service_provider/request")}
														emebed={{
															id: request?.id,
															date: request?.date,
															service_provider_id: data?.serviceProvider?.id,
															user_id: request?.userId
														}}
														schema={acceptRequestSchema}
														data={data.requestForms.accept}
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
									</li>
								{/each}
							</ul>
						{/each}
					{/each}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</AppShell>
