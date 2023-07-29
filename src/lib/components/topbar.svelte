<script lang="ts">
    import Github from "$lib/icons/github.svelte";
</script>

<topbar class="block flex h-10 w-full items-center justify-between bg-white/10 px-2 leading-none text-white backdrop-blur-xl">
    <github-icon>
        <a
            href="https://github.com/tokitou-san/SwinOS"
            target="_blank"
            class="opacity-75 transition-opacity hover:opacity-100"
        >
            <Github class="w-6" />
        </a>
    </github-icon>
    <time>Time</time>
    <controls>Controls</controls>
</topbar>
