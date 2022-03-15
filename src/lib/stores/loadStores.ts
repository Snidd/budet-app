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
	if (data.categories && data.categories.length > 0) {
		console.log('updating category stores.');
		allCategories.update((cats) => (cats && cats.length === 0 ? data.categories : cats));
	}
	if (data.categoryRows && data.categoryRows.length > 0) allCategoryRows.set(data.categoryRows);
	if (data.elements && data.elements.length > 0) allElements.set(data.elements);
	if (data.months && data.months.length > 0) allMonths.set(data.months);
};
