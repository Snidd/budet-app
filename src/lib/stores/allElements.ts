import type { BudgetElement } from '$model/index';
import { writable } from 'svelte/store';

export const allElements = writable<BudgetElement[]>([]);
