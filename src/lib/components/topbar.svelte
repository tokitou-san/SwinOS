<script lang="ts">
    import Airplane from "$lib/icons/airplane.svelte";
    import Battery_80 from "$lib/icons/battery/battery-80.svelte";
    import Bluetooth from "$lib/icons/bluetooth.svelte";
    import Brightness from "$lib/icons/brightness.svelte";
    import Lock from "$lib/icons/lock.svelte";
    import Night from "$lib/icons/night.svelte";
    import Power from "$lib/icons/power.svelte";
    import Settings from "$lib/icons/settings.svelte";
    import Volume from "$lib/icons/volume.svelte";
    import Wifi from "$lib/icons/wifi.svelte";
    // import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { clickoutside } from "$lib/utils/clickoutside";
    import type { SvelteComponentDev } from "svelte/internal";
    import { apps } from "$lib/store/apps";
    import AppPopdownContextMenu from "./contextmenus/app_popdown_context_menu.svelte";

    /* Get current time and date */
    let current_time_date: string;
    get_time_date();

    function get_time_date(): void {
        let current_time = new Date();

        let current_month = current_time.toLocaleString("en-US", { month: "short" });
        let current_day = current_time.getDate();
        let current_hour_minute = current_time.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" });

        current_time_date = `${current_month} ${current_day} - ${current_hour_minute}`;
    }

    /* Uncomment this on production */
    // onMount(() => {
    //     let date_time_interval = setInterval(get_time_date(), 1000);
    //     return () => clearInterval(date_time_interval);
    // });

    /* Controls popdown states */
    let active_controls: {
        [key: string]: boolean;
    } = {
        wifi: true,
        bluetooth: false,
        night_light: false,
        airplane_mode: false
    };

    /* Show controls */
    let show_controls_popdown = false;
    let show_applications = false;

    function toggle_controls_popdown() {
        show_controls_popdown = !show_controls_popdown;
    }
    function toggle_applications_popdown() {
        show_applications = !show_applications;
    }

    const connectivity_controls_mapping: {
        [key: string]: {
            name: string;
            icon: typeof SvelteComponentDev;
            function: () => void;
        };
    } = {
        wifi: {
            name: "Wifi",
            icon: Wifi,
            function: () => (active_controls["wifi"] = !active_controls["wifi"])
        },
        bluetooth: {
            name: "Bluetooth",
            icon: Bluetooth,
            function: () => (active_controls["bluetooth"] = !active_controls["bluetooth"])
        },
        night_light: {
            name: "Night Light",
            icon: Night,
            function: () => (active_controls["night_light"] = !active_controls["night_light"])
        },
        airplane_mode: {
            name: "Airplane",
            icon: Airplane,
            function: () => (active_controls["airplane_mode"] = !active_controls["airplane_mode"])
        }
    };

    /* Custom context menu */
    let show_app_context_menu = false;
    let context_pos = { x: 0, y: 0 };
    let selected_app_name: string;

    function handle_right_click(event: MouseEvent) {
        const node = event.target as HTMLElement;

        show_app_context_menu = !show_app_context_menu;
        context_pos = { x: event.clientX, y: event.clientY };
        // get app name from target
        selected_app_name = node.textContent!.trim().split(" ")[0];
    }
    function close_context_menu() {
        show_app_context_menu = false;
    }
</script>

<!-- Context menu -->
{#if show_app_context_menu}
    <AppPopdownContextMenu
        {...context_pos}
        app_name={selected_app_name}
        on:mousedown={close_context_menu}
        on:clickoutside={close_context_menu}
    />
{/if}

<topbar
    in:fly={{ y: -50 }}
    class="fixed top-0 block flex h-8 w-full items-center justify-between bg-white/10 leading-none text-white backdrop-blur-xl"
>
    <applications
        class="relative ml-2 h-3/4 select-none"
        use:clickoutside={() => show_applications && toggle_applications_popdown()}
    >
        <applications-trigger
            class="{show_applications && 'bg-white/10'} flex h-full cursor-pointer items-center rounded-md px-2 transition-colors hover:bg-white/10"
            on:mousedown={toggle_applications_popdown}
        >
            <span class="text-xs font-semibold">Applications</span>
        </applications-trigger>

        {#if show_applications}
            <applications-popdown
                class="absolute left-0 flex w-64 translate-y-3 transform flex-col gap-2 rounded-lg bg-white/10 p-3 drop-shadow-2xl backdrop-blur-xl"
                in:fly={{ y: -5, duration: 250 }}
                out:fly={{ y: -5, duration: 250 }}
            >
                <apps-list class="flex flex-col">
                    {#each Object.entries($apps).sort() as app}
                        {@const app_name = app[0]}
                        {@const app_icon = app[1].icon}
                        {@const app_category = app[1].category}

                        <app
                            class="flex cursor-pointer items-center gap-3 rounded-md py-2 w-full h-full duration-200 ease-in-out hover:bg-white/5 hover:px-2"
                            on:contextmenu|preventDefault={handle_right_click}
                        >
                            <app-icon class="block h-8 w-8 pointer-events-none">
                                <svelte:component
                                    this={app_icon}
                                    class="h-full w-full"
                                />
                            </app-icon>
                            <div class="flex h-full flex-col leading-none pointer-events-none">
                                <app-name class="text-xs font-semibold capitalize">{app_name}</app-name>
                                <app-status class="text-xs opacity-50">{app_category}</app-status>
                            </div>
                        </app>
                    {/each}
                </apps-list>
            </applications-popdown>
        {/if}
    </applications>
    <time class="absolute inset-x-0 mx-auto w-max select-none">
        <span class="text-xs font-semibold">{current_time_date}</span>
    </time>
    <controls
        class="relative mr-2 h-3/4"
        use:clickoutside={() => show_controls_popdown && toggle_controls_popdown()}
    >
        <controls-trigger
            class="{show_controls_popdown && 'bg-white/10'} flex h-full cursor-pointer items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10"
            on:mousedown={toggle_controls_popdown}
        >
            <volume>
                <Volume class="w-4" />
            </volume>
            <settings>
                <Settings class="w-4" />
            </settings>
            <battery class="flex items-center gap-1">
                <Battery_80 class="w-4" />
                <span class="select-none text-xs font-semibold">80%</span>
            </battery>
            <power>
                <Power class="w-4" />
            </power>
        </controls-trigger>

        {#if show_controls_popdown}
            <controls-popdown
                in:fly={{ y: -5, duration: 250 }}
                out:fly={{ y: -5, duration: 250 }}
                class="absolute right-0 flex h-max w-72 translate-y-3 transform flex-col gap-4 rounded-lg bg-white/10 p-3 drop-shadow-2xl backdrop-blur-xl"
            >
                <system-control-buttons class="flex items-center justify-between">
                    <battery class="flex items-center gap-1">
                        <Battery_80 class="w-4" />
                        <span class="select-none text-xs font-semibold">80%</span>
                    </battery>

                    <other-controls class="flex items-center gap-2">
                        <settings class="cursor-pointer rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                            <Settings class="w-4" />
                        </settings>
                        <lockscreen class="cursor-pointer rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                            <Lock class="w-4" />
                        </lockscreen>
                        <power class="cursor-pointer rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                            <Power class="w-4" />
                        </power>
                    </other-controls>
                </system-control-buttons>

                <volume-brightness-controls class="flex flex-col gap-3">
                    <volume class="flex cursor-pointer items-center gap-3">
                        <Volume class="w-4" />
                        <input
                            type="range"
                            value="65"
                            class="h-1 w-full cursor-pointer rounded-lg bg-white/20"
                        />
                    </volume>
                    <brightness class="flex cursor-pointer items-center gap-3">
                        <Brightness class="w-4" />
                        <input
                            type="range"
                            value="10"
                            class="h-1 w-full cursor-pointer rounded-lg bg-white/20"
                        />
                    </brightness>
                </volume-brightness-controls>

                <connectivity-controls class="grid grid-cols-2 gap-2">
                    {#each Object.entries(connectivity_controls_mapping) as item}
                        {@const item_key = item[0]}
                        {@const item_name = item[1].name}
                        {@const item_icon = item[1].icon}
                        {@const item_function = item[1].function}

                        {@const is_active = active_controls[item_key]}

                        <control
                            on:mousedown={item_function}
                            class="{is_active && 'bg-white/25 hover:bg-white/25 active:bg-white/25'} flex h-10 cursor-pointer select-none items-center gap-2 rounded-md bg-white/10 pl-3 transition-colors hover:bg-white/20 active:bg-white/25"
                        >
                            <svelte:component
                                this={item_icon}
                                class="w-4"
                            />
                            <span class="text-xs font-semibold">{item_name}</span>
                        </control>
                    {/each}
                </connectivity-controls>
            </controls-popdown>
        {/if}
    </controls>
</topbar>

<style lang="postcss">
    input[type="range"]::-moz-range-thumb {
        @apply h-4 w-4 rounded-full border-0 bg-white;
    }
</style>
