import { onMount } from "svelte";

export function clickoutside(node: HTMLElement, callback_function: () => void) {
    function on_click(event: MouseEvent) {
        if (!node.contains(event.target as HTMLElement)) {
            callback_function();
        }
    }

    onMount(() => {
        document.body.addEventListener("click", on_click);

        return () => {
            document.body.removeEventListener("click", on_click);
        };
    });
}
