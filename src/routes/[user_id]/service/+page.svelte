<script lang="ts">
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import ArrowRightIcon from "$lib/icons/ArrowRightIcon.svelte";
	import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";
	import AppShell from "../../AppShell.svelte";
	import { Accordion, DropdownMenu, Popover } from "bits-ui";
	import type { PageData } from "./$types";
	import { appointmentrequest, friendlyDate } from "$lib/snippets/appointment-details.svelte";
	import SelectTimeRange from "$lib/components/select-time-range.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import { route } from "$lib/routes_helper";
	import { page } from "$app/state";
	import FormAction from "$lib/snippets/form-action.svelte";
	import {
		createRequestSchema,
		unbookAppointmentSchema,
		updateRequestSchema,
		withdrawRequestSchema
	} from "../../services/[service]/[service_provider_id]/requests/schema";
	import MenuIcon from "$lib/icons/MenuIcon.svelte";
	import FormActionButton from "$lib/snippets/form-action-button.svelte";

	let isSM = new IsMobile();
	let { data }: { data: PageData } = $props();
	let isDropdownOpen = $state(false);
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

{#snippet accordionheader(name: string)}
	<Accordion.Header>
		<Accordion.Trigger
			class="group flex w-full flex-1 items-center justify-between px-2.5 py-3 transition-all select-none sm:py-5 [&[data-state=open]>span>span>svg]:rotate-180"
		>
			<h2 class="text-left text-2xl sm:text-3xl">{name}</h2>
			<span
				class="hover:bg-accent inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
			>
				<ChevronDownIcon class="size-8 transition-transform duration-200" />
			</span>
		</Accordion.Trigger>
	</Accordion.Header>
{/snippet}

<AppShell>
	{#snippet header()}
		<span class="text-xl font-medium">Services</span>
		<Button class="group pr-2.5" href="/services/osteopathy" variant="secondary">
			Osteopaths
			<ArrowRightIcon />
		</Button>
	{/snippet}
	{#each data.appointments as { date, id, startAt, endAt, location, serviceProvider, appointmentRequestId } (id)}
		<div class="mt-4 flex w-full flex-col items-center pb-10">
			<div class="flex flex-col items-center gap-4">
				<Avatar
					class="size-32"
					src={serviceProvider?.user?.picture}
					alt="{serviceProvider?.user?.name} Profile Picture"
					fallback={(serviceProvider?.user?.name ?? "AB").substring(0, 2)}
				/>
				<div class="flex w-full flex-col items-center">
					<h3 class="text-2xl">{serviceProvider?.user?.name}</h3>
					<div class="flex w-full flex-wrap justify-between">
						<p class="text-xl">{friendlyDate(date)}</p>
						<div class="flex gap-x-2 text-xl">
							<span>{startAt}</span>
							{#if endAt}
								<span>to</span>
								<span>{endAt}</span>
							{:else}
								<span>onwards</span>
							{/if}
						</div>
					</div>
					<div class="flex w-full flex-wrap justify-between">
						<p class="text-xl">Location</p>
						<div class="flex gap-x-2 text-xl">
							{location ?? "Sri Sri University"}
						</div>
					</div>
					<div
						class={buttonVariants({
							class: "mt-5 mb-6 bg-blue-500 text-white hover:bg-blue-500"
						})}
					>
						Appointment Confirmed
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
			</div>
		</div>
	{/each}
	{#if data.appointments.length === 0}
		<Accordion.Root value={["requested", "available"]} class="w-full" type="multiple">
			{#if data.appointmentRequests.length !== 0}
				<Accordion.Item value="requested" class="border-border border-b">
					{@render accordionheader("Requested")}
					<Accordion.Content
						class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
					>
						<div class="mt-4 pb-10">
							{#each data.appointmentRequests as { id, date, status, startAt, endAt, serviceProvider, dateWiseSchedule } (id)}
								<div class="flex items-start gap-x-3 sm:gap-x-6">
									<Avatar
										class="size-14"
										src={serviceProvider?.user.picture}
										alt="@{serviceProvider?.username}"
										fallback={(serviceProvider?.user.name ?? "CN").substring(0, 2)}
									/>
									<div class="flex w-full flex-col">
										<h3 class="text-xl font-medium">{serviceProvider?.user.name}</h3>
										<p class="text-muted-foreground text-lg font-medium">
											{serviceProvider?.user.universityMail ?? serviceProvider?.user.email}
										</p>
									</div>
								</div>
								<div class="mt-4">
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
																			class={buttonVariants({
																				variant: "secondary",
																				class: "w-full"
																			})}
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
																				To ensure better convenience for you, accordingly time-slots
																				will be assigned to you.
																			</p>
																			<FormAction
																				action={requestactions.update}
																				emebed={{
																					appointment_request_id: id,
																					date_wise_schedule_id: dateWiseSchedule?.id,
																					service_provider_id: serviceProvider?.id,
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
																					<Button disabled={loading} type="submit" size="sm"
																						>Submit</Button
																					>
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
								</div>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/if}
			{#if data.subscriptions.length !== 0}
				<Accordion.Item value="available" class="border-border border-b">
					{@render accordionheader("Subscriptions")}
					<Accordion.Content
						class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
					>
						<div class="mt-4 flex flex-col gap-y-4 pb-10">
							{#each data.subscriptions as subscription (subscription.id)}
								<div class="flex items-start gap-x-3 sm:gap-x-6">
									<Avatar
										class="size-14"
										src={subscription.serviceProvider?.user.picture}
										alt="@{subscription.serviceProvider?.username}"
										fallback={(subscription.serviceProvider?.username ?? "AB").substring(0, 2)}
									/>
									<div class="flex flex-col">
										<h3 class="text-foreground text-xl font-medium">
											{subscription.serviceProvider?.user.name}
										</h3>
										<p class="text-muted-foreground text-lg font-medium">
											{subscription.serviceProvider?.user.universityMail}
										</p>
									</div>
								</div>
								<div class="mt-4 flex flex-col gap-y-4 sm:mt-2 sm:gap-y-2">
									{#each subscription.serviceProvider?.dateWiseScheduleList ?? [] as { id, date, startAt, endAt } (id)}
										{#if date && startAt}
											{#snippet button()}
												<Popover.Root>
													<Popover.Trigger
														class={buttonVariants({ variant: "default", size: "xs" })}
													>
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
															To ensure better convenience for you, accordingly time-slots will be
															assigned to you.
														</p>
														<FormAction
															action={requestactions.create}
															emebed={{
																date_wise_schedule_id: id,
																date: date,
																service_provider_id: subscription?.serviceProvider?.id
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
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{:else}
				<!-- Create a Blank Space -->
				<Button class="group pr-2.5" href="/services/osteopathy" variant="secondary">
					Subscribe
					<ArrowRightIcon />
				</Button>
			{/if}
		</Accordion.Root>
	{/if}
</AppShell>
