import type { BudgetBasicElement, BudgetCategory } from '$model/StartingModel';

export const getTotalForMonth = (elements: BudgetBasicElement[], month: number): number => {
	return elements.reduce((prev, cur) => {
		if (cur.month === month) {
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
