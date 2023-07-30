export function clickoutside(node: HTMLElement, callback_function: any) {
    function on_click(event: MouseEvent) {
        if (!node.contains(event.target as HTMLElement)) {
            callback_function();
        }
    }

    document.body.addEventListener("click", on_click);

    return {
        destroy() {
            document.body.removeEventListener("click", on_click);
        }
    };
}
