import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';

export const addCategoryRow = async (
	categoryId: string,
	preRowIndex: number | undefined,
	before: boolean = true
) => {
	allCategoryRows.update((rows) => {
		if (preRowIndex === undefined) {
			preRowIndex = rows.reduce((prev, cur) => {
				if (cur.index > prev) {
					return cur.index;
				}
			}, 1);
		}

		if (before) {
			preRowIndex--;
		}

		const newCategoryRow: BudgetCategoryRow = {
			_id: Math.random().toString(10), // get the real ID here?
			categoryId: categoryId,
			isOnCredit: false,
			recurring: false,
			index: preRowIndex,
			name: 'Namnlös',
			isIncome: false
		};

		const updatedIndexRows = rows.map((row) => {
			if (row.index >= preRowIndex) {
				row.index++;
			}
			return row;
		});

		updatedIndexRows.push(newCategoryRow);

		return updatedIndexRows;
	});
};
