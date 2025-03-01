<script lang="ts">
	import AppointmentCard from "$lib/components/appointment-card.svelte";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";
	import AppShell from "../../AppShell.svelte";
	import { Accordion } from "bits-ui";
	const osteopath = {
		id: "0d9qowa7pgtheap",
		name: "Andrew Taylor Still",
		gmail: "andrew.taylor@example.com",
		image: "/profile-pics/andrew.webp",
		role: "osteopath",
		phone_number: "XXXXXXXXXX",
		username: "andrew.taylor",
		course: {
			name: "Osteopathy"
		},
		batch: "first"
	};
</script>

{#snippet accordionheader(name: string)}
	<Accordion.Header>
		<Accordion.Trigger
			class="flex w-full flex-1 items-center justify-between px-2.5 py-3 transition-all select-none sm:py-5 [&[data-state=open]>span>svg]:rotate-180"
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
		<span class="text-xl font-medium">Appointments</span>
	{/snippet}
	<Accordion.Root
		value={["confirmed", "requested", "available", "feedbacks"]}
		class="w-full"
		type="multiple"
	>
		<Accordion.Item value="confirmed" class="border-border border-b">
			{@render accordionheader("Confirmed")}
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="mt-4 pb-10">
					<AppointmentCard
						status="confirmed"
						service_provider={osteopath}
						date={"23rd Feb 2025"}
						startAt="10:00 AM"
						location="Shruti 413"
						format="casual"
					/>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="requested" class="border-border border-b">
			{@render accordionheader("Requested")}
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="mt-4 pb-10">
					<div class="flex items-start gap-x-3 sm:gap-x-6">
						<Avatar
							class="size-14"
							src={osteopath.image}
							alt="@{osteopath.username}"
							fallback={osteopath.name.substring(0, 2)}
						/>
						<div class="flex w-full flex-col">
							<div class="flex justify-between">
								<h3 class="text-xl font-medium">{osteopath.name}</h3>
								<Button size="xs" class="px-2">Edit</Button>
							</div>
							<div class="flex flex-wrap justify-between">
								<p class="text-muted-foreground text-lg font-medium">
									Today Shruti Ground Floor 113
								</p>
								<p class="text-muted-foreground text-lg font-medium">3:00 PM to 5:00 PM</p>
							</div>
						</div>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="available" class="border-border border-b">
			{@render accordionheader("Available")}
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="mt-4 flex flex-col gap-y-4 pb-10">
					<div class="flex items-start gap-x-3 sm:gap-x-6">
						<Avatar
							class="size-14"
							src={osteopath.image}
							alt="@{osteopath.username}"
							fallback={osteopath.name.substring(0, 2)}
						/>
						<div class="flex flex-col">
							<h3 class="text-foreground text-xl font-medium">{osteopath.name}</h3>
							<p class="text-muted-foreground text-lg font-medium">{osteopath.course.name}</p>
						</div>
					</div>
					<div class="mt-4 flex flex-col gap-y-4 sm:mt-0 sm:gap-y-2">
						{#each [{ date: "Today", location: "Shruti 2nd Floor 201", timings: "10:00 AM - 11:00 AM" }, { date: "Today", location: "Shruti 1st Floor 113", timings: "03:00 PM Onwards" }] as appointment}
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
						{/each}
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="feedbacks" class="border-border border-b">
			{@render accordionheader("Feedbacks")}
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-4 text-sm tracking-[-0.01em]"
			>
				<div class="mt-4 flex flex-col gap-y-6 pb-10">
					<div>Feedbacks</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</AppShell>
