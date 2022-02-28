import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';
import { writable } from 'svelte/store';
export const selectedRow = writable<BudgetCategoryRow | null>(null);
