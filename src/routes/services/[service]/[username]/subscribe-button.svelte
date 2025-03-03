<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";
	import BellIcon from "$lib/icons/BellIcon.svelte";
	import BellRingIcon from "$lib/icons/BellRingIcon.svelte";

	let {
		service_provider_id,
		subscribed = $bindable(false)
	}: { service_provider_id: string; subscribed: boolean } = $props();
	let loading = $state(false);
</script>

<form
	action="/services/{page.params.service}/{page.params.username}?/{subscribed
		? 'unsubscribe'
		: 'subscribe'}"
	method="POST"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted
		loading = true;
		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			if (result.type === "success") {
				subscribed = !subscribed; // toggle subscription state
			}
			await update(); // call update to trigger the default logic
			loading = false;
		};
	}}
>
	<input
		type="hidden"
		id="service_provider_id"
		name="service_provider_id"
		value={service_provider_id}
	/>
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
