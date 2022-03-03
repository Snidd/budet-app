import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';

export const addCategoryRow = async (catId: number, preRowId: number, before: boolean = true) => {
	allCategoryRows.update((rows) => {
		const preIndex = rows.findIndex((row) => row.id === preRowId);
		const newCategoryRow: BudgetCategoryRow = {
			id: rows.length + 1,
			categoryId: catId,
			isOnCredit: false,
			recurring: false,
			name: 'Namnlös',
			isIncome: false
		};
		console.log(`adding row: ${newCategoryRow.id}`);
		if (before) {
			rows.splice(preIndex, 0, newCategoryRow);
			return rows;
		}
		rows.splice(preIndex + 1, 0, newCategoryRow);
		return rows;
	});
};
