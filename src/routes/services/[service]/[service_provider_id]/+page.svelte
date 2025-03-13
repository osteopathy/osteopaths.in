<script lang="ts">
	import { page } from "$app/state";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import CalendarEditIcon from "$lib/icons/CalendarEditIcon.svelte";
	import { appointmentrequest, friendlyDate } from "$lib/snippets/appointment-details.svelte";
	import { DropdownMenu, Popover } from "bits-ui";
	import AppShell from "../../AppShell.svelte";
	import type { PageData } from "./$types";
	import SubscribeButton from "./subscribe-button.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import SelectTimeRange from "$lib/components/select-time-range.svelte";
	import { route } from "$lib/routes_helper";
	import MenuIcon from "$lib/icons/MenuIcon.svelte";
	import FormAction from "$lib/snippets/form-action.svelte";
	import {
		createRequestSchema,
		unbookAppointmentSchema,
		updateRequestSchema,
		withdrawRequestSchema
	} from "./requests/schema";
	import FormActionButton from "$lib/snippets/form-action-button.svelte";

	let isSM = new IsMobile();
	let isDropdownOpen = $state(false);
	let { data }: { data: PageData } = $props();
	const unbookappointmentaction = route(
		"unbookappointment /services/[service]/[service_provider_id]/requests",
		{
			service: page.params.service,
			service_provider_id: page.params.service_provider_id
		}
	);
	const requestactions = {
		update: route("update /services/[service]/[service_provider_id]/requests", {
			service: page.params.service,
			service_provider_id: page.params.service_provider_id
		}),
		withdraw: route("withdraw /services/[service]/[service_provider_id]/requests", {
			service: page.params.service,
			service_provider_id: page.params.service_provider_id
		}),
		create: route("create /services/[service]/[service_provider_id]/requests", {
			service: page.params.service,
			service_provider_id: page.params.service_provider_id
		})
	};
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
	<div class="mt-8 w-full px-2.5">
		<div class="mb-8 flex justify-between">
			<h2 class="flex items-center gap-x-2 text-xl">
				<span><CalendarEditIcon /></span>
				<span>
					{#if data.serviceProvider?.dateWiseScheduleList}
						Schedule
					{:else if data?.appointmentRequests}
						Requests
					{:else if data.serviceProvider?.appointments}
						Your Appointment
					{/if}
				</span>
			</h2>
			<SubscribeButton bind:subscribed={data.isSubscribed} />
		</div>
		<div class="mt-4 flex w-full flex-col gap-y-4 sm:mt-0 sm:gap-y-2">
			<!-- <pre>{JSON.stringify(data.serviceProvider?.appointments, null, 2)}</pre> -->
			{#each data.serviceProvider?.appointments ?? [] as { id, date, startAt, endAt, location, appointmentRequestId } (id)}
				<div class="flex flex-col items-center">
					<div class="mb-4 text-xl">
						{friendlyDate(date)} | {startAt} to {endAt} | {location ?? "Sri Sri University"}
					</div>
					{#if appointmentRequestId}
						<Popover.Root>
							<Popover.Trigger class={buttonVariants({ variant: "destructive", size: "sm" })}>
								Cancel Appointment
							</Popover.Trigger>
							<Popover.Content
								align={isSM.current ? "end" : "center"}
								side={isSM.current ? "top" : "bottom"}
								class="bg-layer-3 max-w-xs rounded-2xl px-4 pt-4 pb-5"
							>
								<Popover.Arrow class="text-layer-10" />
								<h2 class="text-xl">Notify</h2>
								<p class="text-base">Please provide with the reason</p>
								<FormAction
									action={unbookappointmentaction}
									emebed={{ appointment_id: id, appointment_request_id: appointmentRequestId }}
									schema={unbookAppointmentSchema}
									data={data.unbookappointment}
								>
									{#snippet form({ field, loading, errors })}
										{@const note = field("note")}
										<textarea
											minlength="10"
											class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
											name={note.name}
											id={note.name}
											bind:value={note.get, note.update}
										></textarea>
										{#if errors.note}
											<p>{errors.note}</p>
										{/if}
										<Button disabled={loading} class="mt-4" size="sm" type="submit">Submit</Button>
									{/snippet}
								</FormAction>
							</Popover.Content>
						</Popover.Root>
					{/if}
				</div>
			{/each}

			{#each data.appointmentRequests ?? [] as { id, date, startAt, endAt, dateWiseSchedule, status }, index (index)}
				{#if date && startAt}
					{#snippet button()}
						{#if status === "accepted"}
							<div>Accepted</div>
						{:else}
							<DropdownMenu.Root bind:open={isDropdownOpen}>
								<DropdownMenu.Trigger
									class={buttonVariants({ variant: "secondary", size: "icon" })}
								>
									<MenuIcon />
								</DropdownMenu.Trigger>
								<DropdownMenu.Portal>
									<DropdownMenu.Content
										class="border-muted bg-background flex flex-col gap-y-2 rounded-xl border px-1 py-1.5 outline-hidden focus-visible:outline-hidden"
										sideOffset={8}
									>
										{#if dateWiseSchedule}
											<DropdownMenu.Item>
												{#snippet child()}
													<Popover.Root>
														<Popover.Trigger
															class={buttonVariants({ variant: "secondary", class: "w-full" })}
														>
															Update
														</Popover.Trigger>
														<Popover.Content
															align={isSM.current ? "end" : "center"}
															side={isSM.current ? "top" : "bottom"}
															class="bg-layer-3 max-w-xs rounded-2xl px-4 pt-4 pb-5"
														>
															<Popover.Arrow class="text-layer-10" />
															<h2 class="text-xl">Predefine your availability</h2>
															<p class="">
																To ensure better convenience for you, accordingly time-slots will be
																assigned to you.
															</p>
															<FormAction
																action={requestactions.update}
																emebed={{
																	appointment_request_id: id,
																	date_wise_schedule_id: dateWiseSchedule?.id,
																	date: date
																}}
																onComplete={() => {
																	isDropdownOpen = false;
																}}
																schema={updateRequestSchema}
																data={data.requestforms.update}
															>
																{#snippet form({ loading })}
																	<SelectTimeRange
																		from={dateWiseSchedule.startAt}
																		to={dateWiseSchedule.endAt}
																	/>
																	<Button disabled={loading} type="submit" size="sm">Submit</Button>
																{/snippet}
															</FormAction>
														</Popover.Content>
													</Popover.Root>
												{/snippet}
											</DropdownMenu.Item>
										{/if}
										<DropdownMenu.Item>
											{#snippet child()}
												<FormActionButton
													emebed={{ appointment_request_id: id }}
													action={requestactions.withdraw}
													schema={withdrawRequestSchema}
													data={data.requestforms.withdraw}
													variant="destructive"
												>
													Withdraw Request
												</FormActionButton>
											{/snippet}
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Portal>
							</DropdownMenu.Root>
						{/if}
					{/snippet}

					{@render appointmentrequest(
						{
							date,
							startAt,
							endAt
						},
						button
					)}
				{/if}
			{/each}
			{#each data.serviceProvider?.dateWiseScheduleList ?? [] as { id, date, startAt, endAt }, _ (id)}
				{#if date && startAt}
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
								<FormAction
									action={requestactions.create}
									emebed={{
										date_wise_schedule_id: id,
										date: date
									}}
									schema={createRequestSchema}
									data={data.requestforms.create}
								>
									{#snippet form({ loading })}
										<SelectTimeRange from={startAt} to={endAt} />
										<Button disabled={loading} type="submit" size="sm">Submit</Button>
									{/snippet}
								</FormAction>
							</Popover.Content>
						</Popover.Root>
					{/snippet}
					{@render appointmentrequest({ date, startAt, endAt }, button)}
				{/if}
			{/each}
		</div>
	</div>
</AppShell>
