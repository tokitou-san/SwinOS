<script lang="ts">
    import Topbar from "$lib/components/topbar.svelte";
    import Bottombar from "$lib/components/bottombar.svelte";
    import MainContextMenu from "$lib/components/contextmenus/main_context_menu.svelte";

    const SHOW_COMPONENTS_DELAY = 300;
    // show / hide components
    let show_top_bottom_bars = false;

    setTimeout(() => {
        show_top_bottom_bars = true;
    }, SHOW_COMPONENTS_DELAY);

    /* Context menu */
    let show_main_context_menu = false;
    let context_pos = { x: 0, y: 0 };

    function handle_right_click(event: MouseEvent) {
        // show/hide custom menu
        show_main_context_menu = !show_main_context_menu;
        // set event position
        context_pos = { x: event.clientX, y: event.clientY };
    }
    function close_context_menu() {
        show_main_context_menu = false;
    }
</script>

<svelte:head>
    <title>Swin OS</title>
</svelte:head>

{#if show_main_context_menu}
    <MainContextMenu
        {...context_pos}
        on:mousedown={close_context_menu}
        show_context_menu={show_main_context_menu}
        on:clickoutside={close_context_menu}
    />
{/if}

<main-container class="flex h-full flex-col">
    <topbar-container class="flex h-8 justify-center">
        {#if show_top_bottom_bars}
            <Topbar />
            <Bottombar />
        {/if}
    </topbar-container>

    <center-body
        class="flex h-full w-full"
        on:contextmenu|preventDefault={handle_right_click}
    />
</main-container>
