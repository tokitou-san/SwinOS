import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { SvelteComponentDev } from "svelte/internal";

import Github from "$lib/icons/github.svelte";
import FireFox from "$lib/icons/firefox.svelte";

export const apps: Writable<{
	[key: string]: {
		icon: typeof SvelteComponentDev;
		category: string;
	}
}> = writable({
	github: {
		icon: Github,
		category: "Source Code"
	},
	firefox: {
		icon: FireFox,
		category: "Internet"
	}
})