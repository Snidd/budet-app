import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';
import { derived, writable } from 'svelte/store';

export const allCategoryRows = writable<BudgetCategoryRow[]>([]);

export const sortedCategoryRows = derived(allCategoryRows, ($allCategoryRows) => {
	return [...$allCategoryRows].sort((a, b) => a.index - b.index);
});
