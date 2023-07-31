<script lang="ts">
	export let x: number;
	export let y: number;
</script>

<context-menu
	on:mousedown
	class="absolute z-[999] block bg-white/20 backdrop-blur-xl"
	style="top: {y}px; left: {x}px;"
>
	Context menu
</context-menu>