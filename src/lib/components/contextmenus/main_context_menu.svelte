<script lang="ts">
    import { clickoutside } from "$lib/utils/clickoutside";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    export let x: number;
    export let y: number;

    let context_element: HTMLElement;

    const dispatch = createEventDispatcher();
    function handle_outside_click() {
        dispatch("clickoutside");
    }

    $: (() => {
        // prevent context menu from overflowing
        if (!context_element) return;

        const rect = context_element.getBoundingClientRect();
        x > window.innerWidth - rect.width ? x -= rect.width : x;
        y > window.innerHeight - rect.height ? y -= rect.height : y;
    })();
</script>

<context-menu
    on:mousedown
    on:contextmenu|preventDefault
    bind:this={context_element}
    use:clickoutside={handle_outside_click}
    transition:fade={{ duration: 50 }}
    class="absolute z-[999] block h-max w-48 overflow-hidden rounded-md bg-white/20 leading-none text-white drop-shadow-2xl backdrop-blur-xl"
    style="top: {y}px; left: {x}px;"
>
    <button class="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">Refresh</button>
    <button class="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">Change background</button>
    <button class="w-full px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">Settings</button>
</context-menu>
