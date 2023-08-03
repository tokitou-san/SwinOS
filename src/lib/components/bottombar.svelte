<script lang="ts">
    import Menu from "$lib/icons/menu.svelte";
    import Search from "$lib/icons/search.svelte";
    import { apps } from "$lib/store/apps";
    import { fly } from "svelte/transition";
</script>

<div
    in:fly={{ y: 50 }}
    class="fixed bottom-0 flex h-14 items-center justify-between gap-5 rounded-t-md bg-white/10 px-5 backdrop-blur-xl"
>
    <start class="flex">
        <button>
            <Menu class="w-6" />
        </button>
    </start>

    <pinned-apps class="relative flex items-center text-white">
        {#each Object.entries($apps).sort() as app}
            {@const app_icon = app[1].icon}
            {@const app_name = app[0]}

            <button class="relative group flex w-10 items-center justify-center rounded-md p-2 duration-[250ms] hover:w-14 hover:pb-10">
                <svelte:component
                    this={app_icon}
                    class="w-full"
                />
                <tooltip class="absolute -top-5 text-xs capitalize opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
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
