import type { BudgetCategory, BudgetCategoryRow, BudgetElement } from '$model';
import type { BudgetMonth } from '$model/BudgetMonth';
import { allCategories } from './allCategories';
import { allCategoryRows } from './allCategoryRows';
import { allElements } from './allElements';
import { allMonths } from './allMonths';

export interface LoadStoresInterface {
	categories?: BudgetCategory[];
	categoryRows?: BudgetCategoryRow[];
	elements?: BudgetElement[];
	months?: BudgetMonth[];
}

export const loadStores = (data: LoadStoresInterface) => {
	if (data.categories) allCategories.set(data.categories ? data.categories : []);
	if (data.categoryRows) allCategoryRows.set(data.categoryRows ? data.categoryRows : []);
	if (data.elements) allElements.set(data.elements ? data.elements : []);
	if (data.months) allMonths.set(data.months ? data.months : []);
};
