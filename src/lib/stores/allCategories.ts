import type { BudgetCategory } from '$model/BudgetCategory';
import { derived, writable } from 'svelte/store';

export const allCategories = writable<BudgetCategory[]>([]);

export const allNormalCategories = derived(allCategories, (categories) => {
	return categories.filter((cat) => cat.isIncome === false);
});

export const allIncomeCategories = derived(allCategories, (categories) => {
	return categories.filter((cat) => cat.isIncome === true);
});
