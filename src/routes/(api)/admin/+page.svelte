<script lang="ts">
	import { enhance } from "$app/forms";
	import PwaEnableNotification from "$lib/components/pwa/pwa-enable-notification.svelte";
	import PwaInstallButton from "$lib/components/pwa/pwa-install-button.svelte";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import AppShell from "../../AppShell.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<AppShell>
	{#snippet header()}
		<span>
			<a href="/">home</a> - {data.userCount} Users
		</span>
		<PwaEnableNotification />
		<PwaInstallButton />
	{/snippet}
	<ul>
		{#each data.users as user (user.id)}
			<li class="mb-10 flex flex-wrap items-center gap-4">
				<Avatar class="size-12" src={user.picture} alt="Pic" fallback="FA" />
				<form method="post" use:enhance>
					<input type="text" id="user_id" name="user_id" value={user.id} />
					<button>Sign In as</button>
				</form>
				<span>{user.name}</span>
				<span>{user.role}</span>
				<span>{user.email}</span>
				<span>{user.universityMail}</span>
				<span>{user.status}</span>
				<span>{user.phone}</span>
			</li>
		{/each}
	</ul>
</AppShell>
