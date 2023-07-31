<script lang="ts">
    import { clickoutside } from "$lib/utils/clickoutside";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    export let x: number;
    export let y: number;
    export let app_name: string;

    const dispatch = createEventDispatcher();
    function handle_outside_click() {
        dispatch("clickoutside");
    }
</script>

<context-menu
    on:mousedown
    transition:fade={{ duration: 50 }}
    use:clickoutside={handle_outside_click}
    class="absolute z-[999] block h-max w-40 overflow-hidden rounded-md bg-white/20 leading-none text-white drop-shadow-2xl backdrop-blur-xl"
    style="top: {y}px; left: {x}px;"
>
    <button class="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">
        Open <span class="font-semibold capitalize">{app_name}</span>
    </button>
    <button class="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">Pin to taskbar</button>
</context-menu>
