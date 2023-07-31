<script lang="ts">
    import { clickoutside } from "$lib/utils/clickoutside";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

	export let x: number;
	export let y: number;

	const dispatch = createEventDispatcher();
	function handle_outside_click() {
		dispatch("clickoutside");
	}
</script>

<context-menu
	on:mousedown
	transition:fade={{ duration: 50 }}
	use:clickoutside={handle_outside_click}
	class="absolute z-[999] block bg-white/20 w-40 h-max text-white rounded-md overflow-hidden backdrop-blur-xl leading-none"
	style="top: {y}px; left: {x}px;"
>
	<button class="text-xs py-2 px-3 w-full text-left hover:bg-white/10 transition-colors">Open <span class="font-semibold">Files</span></button>
	<button class="text-xs py-2 px-3 w-full text-left hover:bg-white/10 transition-colors">Pin to taskbar</button>
</context-menu>