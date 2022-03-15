import type { BudgetCategory } from '$model';
import type { BudgetCategoryRow } from '$model/BudgetCategoryRow';
import { derived, writable } from 'svelte/store';

export const allCategoryRows = writable<BudgetCategoryRow[]>([]);

export const sortedCategoryRows = derived(allCategoryRows, ($allCategoryRows) => {
	return [...$allCategoryRows].sort((a, b) => a.index - b.index);
});

export const rowsByCategory = (category: BudgetCategory) =>
	derived(allCategoryRows, ($allCategoryRows) => {
		let additionalRows: BudgetCategoryRow[] = [];
		if (category.containsCreditCopies) {
			additionalRows = $allCategoryRows.filter((row) => row.isOnCredit);
		}
		const rowsByCategory = $allCategoryRows.filter((row) => row.categoryId === category._id);
		return additionalRows.concat(rowsByCategory);
	});
