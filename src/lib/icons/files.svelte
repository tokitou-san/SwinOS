<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
    type $$Props = SVGAttributes<SVGElement>;
</script>

<svg
    {...$$props}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M36 5H18L14 0H4C1.8 0 0 2.25 0 5V15H40V10C40 7.25 38.2 5 36 5Z"
        fill="#FFA000"
    />
    <path
        d="M36 5H4C1.8 5 0 7.25 0 10V35C0 37.75 1.8 40 4 40H36C38.2 40 40 37.75 40 35V10C40 7.25 38.2 5 36 5Z"
        fill="#FFCA28"
    />
</svg>
