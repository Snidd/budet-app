import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';
import { writable } from 'svelte/store';

export const allCategoryRows = writable<BudgetCategoryRow[]>([]);
