import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { SvelteComponentDev } from "svelte/internal";

import Github from "$lib/icons/github.svelte";
import FireFox from "$lib/icons/firefox.svelte";
import Terminal from "$lib/icons/terminal.svelte";
import Music from "$lib/icons/music.svelte";
import Files from "$lib/icons/files.svelte";
import Notes from "$lib/icons/notes.svelte";

export const apps: Writable<{
    [key: string]: {
        icon: typeof SvelteComponentDev;
        category: string;
    };
}> = writable({
    github: {
        icon: Github,
        category: "Source Code"
    },
    firefox: {
        icon: FireFox,
        category: "Internet"
    },
    terminal: {
        icon: Terminal,
        category: "System"
    },
    music: {
        icon: Music,
        category: "Entertainment"
    },
    files: {
        icon: Files,
        category: "System"
    },
    notes: {
        icon: Notes,
        category: "Well Idk"
    }
});
