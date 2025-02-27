<script lang="ts">
	import { onMount } from "svelte";

	let installPrompt: null | Event = $state(null);
	let installButton: HTMLButtonElement;
	function disableInAppInstallPrompt() {
		installPrompt = null;
		installButton.setAttribute("hidden", "");
	}

	onMount(() => {
		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
			installPrompt = event;
			installButton.removeAttribute("hidden");
		});
		window.addEventListener("appinstalled", () => {
			disableInAppInstallPrompt();
		});
	});
</script>

<button
	bind:this={installButton}
	onclick={async () => {
		if (!installPrompt) return;
		// @ts-ignore
		const result = await installPrompt.prompt();
		console.log(`Install prompt was: ${result.outcome}`);
		disableInAppInstallPrompt();
	}}
	hidden>Install</button
>
