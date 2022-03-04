import type { BudgetMonth } from '$model/BudgetMonth';
import { writable } from 'svelte/store';
export const allMonths = writable<BudgetMonth[]>();
