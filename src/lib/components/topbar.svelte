<script lang="ts">
    import Battery_80 from "$lib/icons/battery/battery-80.svelte";
    import Github from "$lib/icons/github.svelte";
    import Power from "$lib/icons/power.svelte";
    import Settings from "$lib/icons/settings.svelte";
    import Volume from "$lib/icons/volume.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    function get_time_date(): string {
        let current_time = new Date();

        let current_month = current_time.toLocaleString("en-US", { month: "short" });
        let current_day = current_time.getDate();
        let current_hour_minute = current_time.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" });

        return `${current_month} ${current_day} - ${current_hour_minute}`;
    }

    onMount(() => {
        let date_time_interval: number;
        date_time_interval = setInterval(get_time_date(), 1000);
        return () => clearInterval(date_time_interval);
    });
</script>

<topbar in:fly={{ y: -50 }} class="relative block flex h-8 w-full items-center justify-between bg-white/10 leading-none text-white backdrop-blur-xl">
    <github-icon class="ml-1 flex h-3/4 cursor-pointer items-center rounded-full p-1 transition-colors hover:bg-white/10">
        <a
            href="https://github.com/tokitou-san/SwinOS"
            target="_blank"
        >
            <Github class="w-5" />
        </a>
    </github-icon>
    <time class="absolute inset-x-0 mx-auto flex h-3/4 w-max cursor-pointer select-none items-center rounded-md px-2 transition-colors hover:bg-white/10">
        <span class="text-xs font-semibold">{get_time_date()}</span>
    </time>
    <controls class="mr-1 flex h-3/4 cursor-pointer items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10">
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
    </controls>
</topbar>
