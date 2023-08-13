<script lang="ts">
    import Menu from "$lib/icons/menu.svelte";
    import Search from "$lib/icons/search.svelte";
    import { apps } from "$lib/store/apps";
    import { clickoutside } from "$lib/utils/clickoutside";
    import { fly } from "svelte/transition";

    let show_start_menu = false,
        start_menu_element: HTMLElement;

    function toggle_start_menu() {
        show_start_menu = !show_start_menu;
    }
</script>

{#if show_start_menu}
    <start-menu
        in:fly={{ y: 5, duration: 250 }}
        out:fly={{ y: 5, duration: 250 }}
        bind:this={start_menu_element}
        class="absolute -bottom-0 mb-16 block h-72 w-[30rem] rounded-lg bg-white/10 backdrop-blur-2xl"
    />
{/if}

<div
    in:fly={{ y: 50 }}
    on:contextmenu|preventDefault
    class="fixed bottom-0 flex h-14 items-center justify-between gap-5 rounded-t-md bg-white/10 px-5 backdrop-blur-xl"
>
    <start class="flex">
        <button on:click={toggle_start_menu}>
            <Menu class="w-6" />
        </button>
    </start>

    <pinned-apps class="relative flex items-center text-white">
        {#each Object.entries($apps).sort() as app}
            {@const app_icon = app[1].icon}
            {@const app_name = app[0]}

            <button class="group relative flex w-10 items-center justify-center rounded-md p-2 duration-[250ms] hover:w-14 hover:pb-10">
                <svelte:component
                    this={app_icon}
                    class="w-full"
                />
                <tooltip class="pointer-events-none absolute -top-4 text-xs capitalize opacity-0 transition-opacity group-hover:opacity-100">
                    {app_name}
                </tooltip>
            </button>
        {/each}
    </pinned-apps>

    <search class="flex">
        <button>
            <Search class=" w-6 text-white" />
        </button>
    </search>
</div>
