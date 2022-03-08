import { allCategories } from '$lib/stores/allCategories';
import type { BudgetCategory } from '$model';
import { ObjectID } from 'bson';

export const addCategory = (name: string) => {
	const id = new ObjectID();

	allCategories.update((categories) => {
		const newCategoryRow: BudgetCategory = {
			_id: id.toString(),
			index: categories.length + 1,
			name: name,
			isIncome: false,
			containsCreditCopies: false
		};
		categories.push(newCategoryRow);
		fetch('/api/category', {
			method: 'POST',
			body: JSON.stringify(newCategoryRow)
		});
		return categories;
	});
};
