<script lang="ts">
	import { page } from "$app/state";
	import NotepadIcon from "$lib/icons/NotepadIcon.svelte";
	import PersonIcon from "$lib/icons/PersonIcon.svelte";
	import type { LayoutProps } from "./$types";
	let { children }: LayoutProps = $props();
</script>

{@render children()}
<nav class="border-border bg-background flex w-full max-w-xl border-t">
	<a
		aria-current={page.url.pathname === "/app/service" && "page"}
		href="/app/service"
		class="group aria-[current='page']:bg-muted aria-[current]:text-foreground relative flex w-full flex-col items-center justify-center p-2"
	>
		<NotepadIcon class="size-6 sm:size-8" />
		<span class="text-xs font-medium sm:text-sm">Appointments</span>
	</a>
	<a
		aria-current={page.url.pathname === "/app" && "page"}
		href="/app"
		class="group aria-[current='page']:bg-muted aria-[current='page']:text-foreground relative flex w-full flex-col items-center justify-center p-2"
	>
		<PersonIcon class="size-6 sm:size-8" />
		<span class="text-xs font-medium sm:text-sm">Profile</span>
	</a>
</nav>
