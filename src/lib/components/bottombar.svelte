<script lang="ts">
    import Menu from "$lib/icons/menu.svelte";
    import Search from "$lib/icons/search.svelte";
    import { apps } from "$lib/store/apps";
    import { fly } from "svelte/transition";
</script>

<div in:fly={{ y: 50 }} class="fixed bottom-0 flex h-14 items-center justify-between gap-10 rounded-t-md bg-white/10 px-5 backdrop-blur-xl">
    <start class="flex">
        <button>
            <Menu class="w-6" />
        </button>
    </start>

    <pinned-apps class="relative flex items-center text-white">
        {#each Object.entries($apps).sort() as app}
            {@const app_icon = app[1].icon}
            {@const app_name = app[0]}

            <button
                class="relative flex w-10 p-2 hover:w-14 hover:pb-10 items-center justify-center hover:bg-white/10sd rounded-md duration-[250ms]"
            >
                <svelte:component
                    this={app_icon}
                    class="w-full"
                />
            </button>
        {/each}
    </pinned-apps>

    <search class="flex">
        <button>
            <Search class=" w-6 text-white" />
        </button>
    </search>
</div>
