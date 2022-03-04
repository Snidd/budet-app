import type { BudgetCategory, BudgetCategoryRow, BudgetElement } from '$model';
import { allCategories } from './allCategories';
import { allCategoryRows } from './allCategoryRows';
import { allElements } from './allElements';
import { allMonths } from './allMonths';

export interface LoadStoresInterface {
	categories: BudgetCategory[];
	categoryRows: BudgetCategoryRow[];
	elements: BudgetElement[];
	months: number[];
}

export const loadStores = (data: LoadStoresInterface) => {
	allCategories.set(data.categories);
	allCategoryRows.set(data.categoryRows);
	allElements.set(data.elements);
	allMonths.set(data.months);
};
