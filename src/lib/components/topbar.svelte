<script lang="ts">
    import Battery_80 from "$lib/icons/battery/battery-80.svelte";
    import Github from "$lib/icons/github.svelte";
    import Power from "$lib/icons/power.svelte";
    import Settings from "$lib/icons/settings.svelte";
    import Volume from "$lib/icons/volume.svelte";
    import { onMount } from "svelte";

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

<topbar class="relative block flex h-8 w-full items-center justify-between bg-white/10 leading-none text-white backdrop-blur-xl">
    <github-icon class="ml-1 hover:bg-white/10 transition-colors h-3/4 rounded-full p-1 flex items-center">
        <a
            href="https://github.com/tokitou-san/SwinOS"
            target="_blank"
        >
            <Github class="w-5" />
        </a>
    </github-icon>
    <time class="absolute inset-x-0 mx-auto w-max select-none cursor-pointer hover:bg-white/10 transition-colors h-3/4 rounded-md px-2 flex items-center">
        <span class="text-xs font-semibold">{get_time_date()}</span>
    </time>
    <controls class="flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors h-3/4 rounded-md px-2 mr-1">
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
