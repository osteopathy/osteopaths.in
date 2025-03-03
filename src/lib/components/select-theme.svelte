<script lang="ts">
	import { mode, setMode } from "mode-watcher";
</script>

<select
	class="bg-layer-3 hover:bg-layer-3 border-layer-6 hover:border-layer-7 rounded-md border py-1 pl-2 shadow-sm"
	onchange={(event) => {
		const selectedMode = event.currentTarget.value as "light" | "dark" | "system";
		setMode(selectedMode);
	}}
	value={$mode}
>
	<option value="light">Theme: Light</option>
	<option value="dark">Theme: Dark</option>
	<option value="system">Theme: System</option>
</select>
