import type { BudgetElement, BudgetCategory, BudgetCategoryRow } from '$model/index';

export const getTotalForMonth = (
	elements: BudgetElement[],
	rows: BudgetCategoryRow[],
	month: number
): number => {
	return elements.reduce((prev, cur) => {
		if (cur.month === month) {
			const row = rows.find((row) => row._id === cur.rowId);
			if (row?.isIncome) {
				return prev - cur.total;
			}
			return prev + cur.total;
		}
		return prev;
	}, 0);
};

export const getTotalWithIncomesForMonth = (
	elements: BudgetElement[],
	categories: BudgetCategory[],
	month: number
): number => {
	return elements.reduce((prev, cur) => {
		if (cur.month === month) {
			const existingCategory = categories.find((cat) => cat._id === cur.categoryId);
			if (existingCategory?.containsCreditCopies) {
				return prev;
			}
			if (existingCategory?.isIncome) {
				return prev + -cur.total;
			} else {
				return prev + cur.total;
			}
		}
		return prev;
	}, 0);
};
