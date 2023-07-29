<script lang="ts">
    import Github from "$lib/icons/github.svelte";

    function get_time_date(): string {
        let current_time = new Date();

        let current_month = current_time.toLocaleString("en-US", { month: "short" });
        let current_day = current_time.getDate();
        let current_hour_minute = current_time.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" });

        return `${current_month} ${current_day} ${current_hour_minute}`;
    }
</script>

<topbar class="relative block flex h-10 w-full items-center justify-between bg-white/10 px-2 leading-none text-white backdrop-blur-xl">
    <github-icon>
        <a
            href="https://github.com/tokitou-san/SwinOS"
            target="_blank"
            class="opacity-75 transition-opacity hover:opacity-100"
        >
            <Github class="w-6" />
        </a>
    </github-icon>
    <time class="absolute inset-x-0 mx-auto w-max">
        <span class="text-base font-semibold text-white/90">{get_time_date()}</span>
    </time>
    <controls>Controls</controls>
</topbar>
