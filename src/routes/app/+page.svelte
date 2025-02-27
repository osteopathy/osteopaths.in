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
	} from "../(api)/api/v1/image/helpers";
	import AppShell from "../AppShell.svelte";
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";
	import { page } from "$app/state";

	const message = page.url.searchParams.get("message");
	let { data }: PageProps = $props();
	let picture = $state(data.user?.picture ?? null);

	const {
		form,
		enhance: formEnhance,
		tainted,
		isTainted,
		delayed
	} = superForm(data.form, {
		resetForm: false
	});
</script>

<AppShell class="flex flex-col items-center gap-y-8">
	{#snippet header()}
		&nbsp;
	{/snippet}
	<div class="group relative flex flex-row items-end">
		<Avatar
			class="-z-10 -mr-8 size-52"
			src={picture}
			alt="{data.user?.name} Profile Image"
			fallback="US"
		/>
		<EditImageDialog
			imageSrc={picture}
			handleUploadImage={async (blobURL) => {
				if (!data.user || !blobURL) return;
				const res = await uploadImageToCloudinary(blobURL);
				if (!res) return;
				picture = res.url;
				await syncCloudinaryURLToDatabase(data.user.id, res.url);
			}}
			handleDeleteImage={async () => {
				if (!data.user || !data.user.picture) return;
				await deleteImage(data.user.id, data.user?.picture);
				picture = null;
			}}
		/>
	</div>
	{#if message}
		<p class="text-center font-medium">{message}</p>
	{/if}
	<form method="POST" use:formEnhance class="flex w-full flex-col gap-y-6 px-4 sm:px-12">
		<div class="flex flex-col gap-y-2">
			<Label for="name">Display Name</Label>
			<Input id="name" bind:value={$form.name} name="name" type="text" />
		</div>
		<div class="flex flex-col gap-y-2">
			<Label for="phone">Phone Number</Label>
			<Input id="phone" name="phone" type="text" bind:value={$form.phone} />
		</div>
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
	</form>
	<div class="flex w-full flex-col gap-y-6 px-4 sm:px-12">
		<div class="flex flex-col items-start gap-y-2 overflow-auto">
			<span class="text-sm font-medium">Personal Google Account</span>
			{#if data.user?.email}
				<div class={buttonVariants({ variant: "secondary" })}>
					<GoogleIcon />
					{data.user?.email}
				</div>
			{:else}
				<Button href="/login/google?connect=personal-mail" variant="secondary">
					<GoogleIcon />
					Connect Google Account
				</Button>
			{/if}
		</div>

		<div class="flex flex-col items-start gap-y-2 overflow-auto">
			<span class="text-sm font-medium">University Gmail</span>
			{#if data.user?.universityMail}
				<div class={buttonVariants({ variant: "secondary" })}>
					{data.user?.universityMail}
				</div>
			{:else}
				<Button href="/login/google?connect=university-mail" variant="secondary">
					Connect University Account
				</Button>
			{/if}
		</div>
	</div>
	<div class="flex w-full items-center justify-between">
		<div></div>
		<form method="post" use:enhance action="/?/logout">
			<Button variant="destructive">Logout</Button>
		</form>
	</div>
</AppShell>
