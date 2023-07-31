<script lang="ts">
    import MainContextMenu from "$lib/components/contextmenus/main_context_menu.svelte";
import Topbar from "$lib/components/topbar.svelte";

    const SHOW_COMPONENTS_DELAY = 300;
    // show / hide components
    let show_topbar = false;

    setTimeout(() => {
        show_topbar = true;
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

<svelte:body on:contextmenu|preventDefault={handle_right_click} />

{#if show_main_context_menu}
    <MainContextMenu {...context_pos} on:mousedown={close_context_menu} on:clickoutside={close_context_menu} />
{/if}

{#if show_topbar}
    <Topbar />
{/if}
