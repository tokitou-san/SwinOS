<script lang="ts">
    import Open from "$lib/icons/open.svelte";
    import Pin from "$lib/icons/pin.svelte";
    import { clickoutside } from "$lib/utils/clickoutside";
    import { createEventDispatcher } from "svelte";
    import type { SvelteComponentDev } from "svelte/internal";
    import { fade } from "svelte/transition";

    export let x: number;
    export let y: number;
    export let app_name: string;

    const dispatch = createEventDispatcher();
    function handle_outside_click() {
        dispatch("clickoutside");
    }

    /* Menu options mappings */
    const menu_mapping: {
        [key: string]: {
            icon: typeof SvelteComponentDev;
            text: string;
        };
    } = {
        open: {
            icon: Open,
            text: `Open <span class="capitalize font-semibold">${app_name}</span>`
        },
        pin: {
            icon: Pin,
            text: "Pin to taskbar"
        }
    };
</script>

<context-menu
    on:mousedown
    on:contextmenu|preventDefault
    transition:fade={{ duration: 50 }}
    class="absolute z-[999] block h-max w-40 overflow-hidden rounded-md bg-white/20 leading-none text-white drop-shadow-2xl backdrop-blur-xl"
    style="top: {y}px; left: {x}px;"
>
    {#each Object.entries(menu_mapping) as item}
        {@const component = item[1].icon}
        {@const text = item[1].text}

        <button class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">
            <svelte:component
                this={component}
                class="w-4 opacity-75"
            />
            <span>{@html text}</span>
        </button>
    {/each}
</context-menu>
