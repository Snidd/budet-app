import type { BudgetBasicElement, BudgetCategory, BudgetCategoryRow } from '$model/index';

export const getTotalForMonth = (
	elements: BudgetBasicElement[],
	rows: BudgetCategoryRow[],
	month: number
): number => {
	return elements.reduce((prev, cur) => {
		if (cur.month === month) {
			const row = rows.find((row) => row.id === cur.rowId);
			if (row?.isIncome) {
				return prev - cur.total;
			}
			return prev + cur.total;
		}
		return prev;
	}, 0);
};

export const getTotalWithIncomesForMonth = (
	elements: BudgetBasicElement[],
	categories: BudgetCategory[],
	month: number
): number => {
	return elements.reduce((prev, cur) => {
		if (cur.month === month) {
			const existingCategory = categories.find((cat) => cat.id === cur.categoryId);
			if (existingCategory?.isIncome) {
				return prev + -cur.total;
			} else {
				return prev + cur.total;
			}
		}
		return prev;
	}, 0);
};
