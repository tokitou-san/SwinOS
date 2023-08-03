import { onMount } from "svelte";

export function clickoutside(node: HTMLElement, options: { callback_function: () => void; exclude: Array<HTMLElement> }) {
    function on_click(event: MouseEvent) {
        if (!node.contains(event.target as HTMLElement) && !options.exclude.some((el) => el && el.contains(event.target as HTMLElement)) && typeof options.callback_function === "function") {
            console.log(options.exclude);
            options.callback_function();
        }
    }

    onMount(() => {
        document.body.addEventListener("click", on_click);

        return () => {
            document.body.removeEventListener("click", on_click);
        };
    });
}
