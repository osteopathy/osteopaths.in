<script lang="ts">
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import AppShell from "../../AppShell.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<AppShell>
	{#snippet header()}
		<a href="/">home</a> {data.userCount} Users
	{/snippet}
	<ul>
		{#each data.users as user}
			<li class="mb-10 flex flex-wrap items-center gap-4">
				<Avatar class="size-12" src={user.picture} alt="Pic" fallback="FA" />
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
