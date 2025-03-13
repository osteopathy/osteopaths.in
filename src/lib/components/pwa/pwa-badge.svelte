<script lang="ts">
	import { useRegisterSW } from "virtual:pwa-register/svelte";
	import Button from "../ui/button/button.svelte";
	import InfoIcon from "$lib/icons/InfoIcon.svelte";

	// check for updates every hour
	const period = 60 * 60 * 1000;

	/**
	 * This function will register a periodic sync check every hour, you can modify the interval as needed.
	 */
	function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
		if (period <= 0) return;

		setInterval(async () => {
			if ("onLine" in navigator && !navigator.onLine) return;

			const resp = await fetch(swUrl, {
				cache: "no-store",
				headers: {
					cache: "no-store",
					"cache-control": "no-cache"
				}
			});

			if (resp?.status === 200) await r.update();
		}, period);
	}

	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (period <= 0) return;
			if (r?.active?.state === "activated") {
				registerPeriodicSync(swUrl, r);
			} else if (r?.installing) {
				r.installing.addEventListener("statechange", (e) => {
					const sw = e.target as ServiceWorker;
					if (sw.state === "activated") registerPeriodicSync(swUrl, r);
				});
			}
		}
	});

	function close() {
		offlineReady.set(false);
		needRefresh.set(false);
	}

	let toast = $derived($offlineReady || $needRefresh);
	let message = $derived(
		$offlineReady
			? "App ready to work offline"
			: $needRefresh
				? "New content available, click on reload button to update."
				: ""
	);
</script>

{#if toast}
	<div
		class="border-border bg-layer-9 shadow-layer-10 fixed right-0 bottom-0 z-1 m-4 flex rounded-md border p-4 shadow-inner"
		role="alert"
		aria-labelledby="toast-message"
	>
		<InfoIcon class="shrink-0" />
		<div class="ml-3">
			<h3 class="text-layer-12 text-sm font-medium">{message}</h3>
			<div class="-mx-2 mt-2 flex gap-x-3">
				{#if $needRefresh}
					<Button size="sm" type="button" onclick={() => updateServiceWorker(true)}>Reload</Button>
				{/if}
				<Button variant="default" size="sm" type="button" onclick={close}>Close</Button>
			</div>
		</div>
	</div>
{/if}
