import { allCategories } from '$lib/stores/allCategories';
import type { BudgetCategory } from '$model';
import { ObjectID } from 'bson';

export const addCategory = async (name: string) => {
	const id = new ObjectID();

	const newCategoryRow: BudgetCategory = {
		_id: id.toString(),
		index: -1,
		name: name,
		isIncome: false,
		containsCreditCopies: false
	};

	allCategories.update((categories) => {
		if (categories === undefined) categories = [];
		newCategoryRow.index = categories.length + 1;
		categories.push(newCategoryRow);
		return categories;
	});

	await fetch(new URL('/api/category', 'http://localhost:3000').toString(), {
		method: 'POST',
		body: JSON.stringify(newCategoryRow)
	});
};
