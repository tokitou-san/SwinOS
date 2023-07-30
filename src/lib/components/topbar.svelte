<script lang="ts">
    import Battery_80 from "$lib/icons/battery/battery-80.svelte";
    import Brightness from "$lib/icons/brightness.svelte";
    import Github from "$lib/icons/github.svelte";
    import Lock from "$lib/icons/lock.svelte";
    import Power from "$lib/icons/power.svelte";
    import Settings from "$lib/icons/settings.svelte";
    import Volume from "$lib/icons/volume.svelte";
    import postcss from "postcss";
    // import { onMount } from "svelte";
    import { fly } from "svelte/transition";

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
</script>

<topbar
    in:fly={{ y: -50 }}
    class="relative block flex h-8 w-full items-center justify-between bg-white/10 leading-none text-white backdrop-blur-xl"
>
    <github-icon class="ml-1 flex h-3/4 cursor-pointer items-center rounded-full p-1 transition-colors hover:bg-white/10">
        <a
            href="https://github.com/tokitou-san/SwinOS"
            target="_blank"
        >
            <Github class="w-5" />
        </a>
    </github-icon>
    <time class="absolute inset-x-0 mx-auto flex h-3/4 w-max cursor-pointer select-none items-center rounded-md px-2 transition-colors hover:bg-white/10">
        <span class="text-xs font-semibold">{current_time_date}</span>
    </time>
    <controls class="relative mr-2 h-3/4 cursor-pointer">
        <controls-trigger class="flex h-full items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10">
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

        <controls-popdown class="absolute flex flex-col gap-4 right-0 h-max w-72 translate-y-3 transform rounded-md bg-white/10 p-3">
            <system-control-buttons class="flex items-center justify-between">
                <battery class="flex items-center gap-1">
                    <Battery_80 class="w-4" />
                    <span class="select-none text-xs font-semibold">80%</span>
                </battery>

                <other-controls class="flex items-center gap-2">
                    <settings class="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                        <Settings class="w-4" />
                    </settings>
                    <lockscreen class="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                        <Lock class="w-4" />
                    </lockscreen>
                    <power class="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 active:bg-white/25">
                        <Power class="w-4" />
                    </power>
                </other-controls>
            </system-control-buttons>

            <volume-brightness-controls class="flex flex-col gap-3">
                <volume class="flex items-center gap-3">
                    <Volume class="w-4" />
                    <input
                        type="range"
                        value="65"
                        class="h-1 w-full cursor-pointer rounded-lg bg-white/20"
                    />
                </volume>
                <brightness class="flex items-center gap-3">
                    <Brightness class="w-4" />
                    <input
                        type="range"
                        value="10"
                        class="h-1 w-full cursor-pointer rounded-lg bg-white/20"
                    />
                </brightness>
            </volume-brightness-controls>

            <connectivity-controls class="grid grid-cols-2 gap-y-2">
                <wifi>Wifi</wifi>
                <bluetooth>Bluetooth</bluetooth>
                <night-light>Night Light</night-light>
                <airplane-mode>Airplane Mode</airplane-mode>
            </connectivity-controls>
        </controls-popdown>
    </controls>
</topbar>

<style lang="postcss">
    input[type="range"]::-moz-range-thumb {
        @apply h-4 w-4 rounded-full border-0 bg-white;
    }
</style>
