<script lang="ts">
	import EditImageDialog from "$lib/components/dialogs/edit-image-dialog.svelte";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import Button, { buttonVariants } from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/form/input.svelte";
	import Label from "$lib/components/ui/form/label.svelte";
	import GoogleIcon from "$lib/icons/GoogleIcon.svelte";
	import { superForm } from "sveltekit-superforms";
	import {
		syncCloudinaryURLToDatabase,
		uploadImageToCloudinary,
		deleteImage
	} from "../../(api)/api/v1/image/helpers";
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";
	import { page } from "$app/state";
	import { isCurrentUser } from "../utils.svelte";
	import { syncCurrentUser } from "../../(api)/api/v1/refresh/helpers";
	import AppShell from "./AppShell.svelte";
	import PwaEnableNotification from "$lib/components/pwa/pwa-enable-notification.svelte";

	const message = page.url.searchParams.get("message");
	let { data }: PageProps = $props();
	let picture = $state(data.pageuser?.picture ?? null);
	$effect(() => {
		picture = data.pageuser?.picture ?? null;
	});
	const {
		form,
		enhance: formEnhance,
		tainted,
		isTainted,
		delayed,
		reset
	} = superForm(data.form, {
		resetForm: false
	});
</script>

<AppShell userId={data.user.id} role={data.user.role ?? "user"}>
	{#snippet header()}
		{#if data.pageuser?.email === "sukhpreetben10@gmail.com"}
			<PwaEnableNotification />
		{:else}
			&nbsp;
		{/if}
	{/snippet}
	<div class="group relative flex flex-row items-end">
		<Avatar
			class="-z-10 -mr-8 size-52"
			src={picture}
			alt="{data.pageuser?.name} Profile Image"
			fallback="US"
		/>
		{#if isCurrentUser()}
			<EditImageDialog
				imageSrc={picture}
				handleUploadImage={async (blobURL) => {
					if (!data.pageuser || !blobURL) return;
					const res = await uploadImageToCloudinary(blobURL);
					if (!res) return;
					picture = res.url;
					await syncCloudinaryURLToDatabase(data.pageuser.id, res.url);
					await syncCurrentUser();
				}}
				handleDeleteImage={async () => {
					if (!data.pageuser || !data.pageuser.picture) return;
					await deleteImage(data.pageuser.id, data.pageuser?.picture);
					await syncCurrentUser();
					picture = null;
				}}
			/>
		{/if}
	</div>
	{#if message}
		<p class="text-center font-medium">{message}</p>
	{/if}
	<form method="POST" use:formEnhance class="flex w-full flex-col gap-y-6 px-4 sm:px-12">
		<div class="flex flex-col gap-y-2">
			<Label for="name">Display Name</Label>
			<Input
				readonly={!isCurrentUser()}
				id="name"
				bind:value={$form.name}
				name="name"
				type="text"
			/>
		</div>
		<div class="flex flex-col gap-y-2">
			<Label for="phone">Phone Number</Label>
			<Input
				readonly={!isCurrentUser()}
				id="phone"
				name="phone"
				type="text"
				bind:value={$form.phone}
			/>
		</div>
		{#if isCurrentUser()}
			<div class="flex gap-x-2">
				<Button
					type="submit"
					disabled={!isTainted($tainted) || $delayed}
					class="w-max {!$delayed && 'disabled:hidden'}"
				>
					{#if $delayed}
						Updating
					{:else}
						Update
					{/if}
				</Button>
				<Button
					disabled={!isTainted($tainted) || $delayed}
					class="w-max {!$delayed && 'disabled:hidden'}"
					type="button"
					variant="secondary"
					onclick={() => reset()}>Reset</Button
				>
			</div>
		{/if}
	</form>
	<div class="flex w-full flex-col gap-y-6 px-4 sm:px-12">
		<div class="flex flex-col items-start gap-y-2 overflow-auto">
			{#if data.pageuser?.email}
				<span class="text-sm font-medium">Personal Google Account</span>
				<div class={buttonVariants({ variant: "secondary" })}>
					<GoogleIcon />
					{data.pageuser?.email}
				</div>
			{:else if isCurrentUser()}
				<span class="text-sm font-medium">Personal Google Account</span>
				<Button href="/login/google?connect=personal-mail" variant="secondary">
					<GoogleIcon />
					Connect Google Account
				</Button>
			{/if}
		</div>
		<div class="flex flex-col items-start gap-y-2 overflow-auto">
			{#if data.pageuser?.universityMail}
				<span class="text-sm font-medium">University Gmail</span>
				<div class={buttonVariants({ variant: "secondary" })}>
					{data.pageuser?.universityMail}
				</div>
			{:else if isCurrentUser()}
				<span class="text-sm font-medium">Personal Google Account</span>
				<Button href="/login/google?connect=university-mail" variant="secondary">
					Connect University Account
				</Button>
			{/if}
		</div>
	</div>
	{#if isCurrentUser()}
		<div class="flex w-full items-center justify-between px-12">
			<div></div>
			<form method="post" use:enhance action="/?/logout">
				<Button variant="destructive">Logout</Button>
			</form>
		</div>
	{/if}
</AppShell>
