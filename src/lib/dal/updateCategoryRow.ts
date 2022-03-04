import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';

export const updateCategoryRow = (updatedRow: BudgetCategoryRow) => {
	allCategoryRows.update((rows) => {
		const idx = rows.findIndex((row) => row._id === updatedRow._id);
		rows[idx] = updatedRow;
		return rows;
	});
};
