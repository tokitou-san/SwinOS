<script lang="ts">
    import Github from "$lib/icons/github.svelte";
</script>

<topbar class="w-full text-white flex items-center justify-between px-2 leading-none h-10 bg-white/10 backdrop-blur-xl block">
	<github-icon>
		<a href="https://github.com/tokitou-san/SwinOS" target="_blank" class="opacity-75 hover:opacity-100 transition-opacity">
			<Github class="w-6" />
		</a>
	</github-icon>
	<time>
		Time
	</time>
	<controls>
		Controls
	</controls>
</topbar>