import type { BudgetCategoryRows } from '$model/StartingModel';
import { writable } from 'svelte/store';

export const allCategoryRows = writable<BudgetCategoryRows[]>([]);
