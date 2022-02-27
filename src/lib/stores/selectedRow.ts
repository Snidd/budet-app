import type { BudgetCategoryRows } from '$model/StartingModel';
import { writable } from 'svelte/store';
export const selectedRow = writable<BudgetCategoryRows | null>(null);
