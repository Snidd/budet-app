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
	allCategories.set(data.categories ? data.categories : []);
	allCategoryRows.set(data.categoryRows ? data.categoryRows : []);
	allElements.set(data.elements ? data.elements : []);
	allMonths.set(data.months ? data.months : []);
};
