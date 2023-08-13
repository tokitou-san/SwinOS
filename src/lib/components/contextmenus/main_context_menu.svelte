<script lang="ts">
    import Display from "$lib/icons/display.svelte";
    import Refresh from "$lib/icons/refresh.svelte";
    import SettingsOutline from "$lib/icons/settings_outline.svelte";
    import { clickoutside } from "$lib/utils/clickoutside";
    import { createEventDispatcher } from "svelte";
    import type { SvelteComponentDev } from "svelte/internal";
    import { fade } from "svelte/transition";

    export let x: number;
    export let y: number;
    export let show_context_menu: boolean;

    let context_element: HTMLElement;
    $: (() => {
        // prevent context menu from overflowing window
        if (!context_element) return;

        const rect = context_element.getBoundingClientRect();
        x > window.innerWidth - rect.width ? (x -= rect.width) : x;
        y > window.innerHeight - rect.height ? (y -= rect.height) : y;
    })();

    /* Menu options mappings */
    const menu_mapping: {
        [key: string]: {
            icon: typeof SvelteComponentDev;
            text: string;
            function?: () => void;
        };
    } = {
        refresh: {
            icon: Refresh,
            text: "Refresh",
            function: () => window.location.reload()
        },
        display_settings: {
            icon: Display,
            text: "Display settings"
        },
        settings: {
            icon: SettingsOutline,
            text: "Settings"
        }
    };
</script>

<context-menu
    on:mousedown
    on:contextmenu|preventDefault
    use:clickoutside={{ enabled: show_context_menu }}
    on:clickoutside
    bind:this={context_element}
    transition:fade={{ duration: 50 }}

    class="absolute z-[999] block h-max w-48 overflow-hidden rounded-md bg-white/20 leading-none text-white drop-shadow-2xl backdrop-blur-xl"
    style="top: {y}px; left: {x}px;"
>
    {#each Object.entries(menu_mapping) as item}
        {@const component = item[1].icon}
        {@const text = item[1].text}
        {@const item_function = item[1].function}

        <button
            on:click={item_function}
            class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-white/10"
        >
            <svelte:component
                this={component}
                class="w-4 opacity-75"
            />
            <span>{text}</span>
        </button>
    {/each}
</context-menu>
