<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";
	import BellIcon from "$lib/icons/BellIcon.svelte";
	import BellRingIcon from "$lib/icons/BellRingIcon.svelte";

	let { subscribed = $bindable(false) }: { subscribed: boolean } = $props();
	let loading = $state(false);
</script>

<form
	action="/services/{page.params.service}/{page.params
		.service_provider_id}/subscription?/{subscribed ? 'unsubscribe' : 'subscribe'}"
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === "success") {
				subscribed = !subscribed;
			}
			await update();
			loading = false;
		};
	}}
>
	<Button
		variant={subscribed ? "outline" : "default"}
		onclick={() => (subscribed = !subscribed)}
		size="sm"
		class={subscribed ? "" : "group"}
	>
		{#if subscribed && !loading}
			<BellRingIcon />
			Subscribed
		{:else if loading}
			Loading...
		{:else}
			<BellIcon />
			Subscribe
		{/if}
	</Button>
</form>
