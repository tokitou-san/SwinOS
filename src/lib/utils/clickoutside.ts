import { createEventDispatcher } from "svelte";

export function clickoutside(node: HTMLElement, params: { enabled: boolean }) {
    let dispatch = createEventDispatcher();
    let listen: boolean = params.enabled;

    // handler function
    function handler(event: MouseEvent) {
        let target = event.target as HTMLElement;
        if (listen && node && !node.contains(target) && !event.defaultPrevented) {
            // dispatch an event
            node.dispatchEvent(new CustomEvent("clickoutside", { detail: event }));
        }
    }

    document.addEventListener("click", handler, true);

    return {
        // update "listen" according to "enabled" gets updated
        update(update: { enabled: boolean }) {
            listen = update.enabled;
        },
        destroy() {
            document.removeEventListener("click", handler, true);
        }
    };
}
