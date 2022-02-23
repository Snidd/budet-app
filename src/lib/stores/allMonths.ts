import { writable } from 'svelte/store';
export const allMonths = writable<number[]>([0, 1, 2]);
