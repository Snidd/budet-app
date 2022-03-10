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

// in-source test suites
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('add', () => {
		expect(
			getTotalWithIncomesForMonth([{ categoryId: '1', month: 1, rowId: '1', total: 10 }], [], 1)
		).toBe(10);

		expect(
			getTotalWithIncomesForMonth(
				[
					{ categoryId: '1', month: 1, rowId: '1', total: 10 },
					{ categoryId: '1', month: 2, rowId: '1', total: 10 }
				],
				[],
				1
			)
		).toBe(10);

		expect(
			getTotalWithIncomesForMonth(
				[
					{ categoryId: '1', month: 2, rowId: '1', total: 10 },
					{ categoryId: '2', month: 1, rowId: '1', total: 10 },
					{ categoryId: '1', month: 1, rowId: '1', total: 10 }
				],
				[{ _id: '2', isIncome: true, containsCreditCopies: false, index: 1, name: 'Test' }],
				1
			)
		).toBe(0);
	});
}
