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

<div class="fixed bottom-0 flex items-center justify-between gap-10 px-5 h-14 bg-white/10 backdrop-blur-xl rounded-t-md">
	<start class="flex">
		<button>
			<Menu class="w-6" />
		</button>
	</start>

	<pinned-apps class="flex items-center text-white relative">
		<glider_element bind:this={glider_element} class="bg-white/10 w-10 h-10 rounded-md absolute pointer-events-none duration-200 ease-in-out opacity-0" />
		{#each Object.entries($apps).sort() as app}
			{@const app_icon = app[1].icon}
			{@const app_name = app[0]}

			<button class="h-10 w-10 flex items-center justify-center" on:mouseenter={on_app_hover} on:mouseleave={() => glider_element.style.opacity = "0"}>
				<svelte:component this={app_icon} class="w-6" />
			</button>
		{/each}
	</pinned-apps>

	<search class="flex">
		<button>
			<Search class=" text-white w-6" />
		</button>
	</search>
</div>