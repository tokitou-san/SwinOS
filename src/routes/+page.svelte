<script lang="ts">
    import Topbar from "$lib/components/topbar.svelte";

    const SHOW_COMPONENTS_DELAY = 300;
    // show / hide components
    let show_topbar = false;

    setTimeout(() => {
        show_topbar = true;
    }, SHOW_COMPONENTS_DELAY);
</script>

<svelte:head>
    <title>Swin OS</title>
</svelte:head>

<main-container class="flex flex-col h-full">
    <topbar-container class="h-8">
        {#if show_topbar}
            <Topbar />
        {/if}
    </topbar-container>

    <center-body class="flex h-full w-full">
        
    </center-body>
</main-container>