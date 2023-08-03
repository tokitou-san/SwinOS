<script lang="ts">
    import Menu from "$lib/icons/menu.svelte";
    import Search from "$lib/icons/search.svelte";
    import { apps } from "$lib/store/apps";

    let glider_element: HTMLElement;

    function on_app_hover(event: MouseEvent) {
        const target = event.target as HTMLElement;

        glider_element.style.opacity = "100";
        glider_element.style.transform = `translateX(${target.offsetLeft}px)`;
    }
</script>

<div class="fixed bottom-0 flex h-14 items-center justify-between gap-10 rounded-t-md bg-white/10 px-5 backdrop-blur-xl">
    <start class="flex">
        <button>
            <Menu class="w-6" />
        </button>
    </start>

    <pinned-apps class="relative flex items-center text-white">
        <glider_element
            bind:this={glider_element}
            class="pointer-events-none absolute h-10 w-10 rounded-md bg-white/10 opacity-0 duration-200 ease-in-out"
        />
        {#each Object.entries($apps).sort() as app}
            {@const app_icon = app[1].icon}
            {@const app_name = app[0]}

            <button
                class="flex h-10 w-10 items-center justify-center"
                on:mouseenter={on_app_hover}
                on:mouseleave={() => (glider_element.style.opacity = "0")}
            >
                <svelte:component
                    this={app_icon}
                    class="w-6"
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
