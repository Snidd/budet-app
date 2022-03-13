import fetchApi from '$lib/fetchApi';
import { allCategories } from '$lib/stores/allCategories';
import type { BudgetCategory } from '$model';
import { ObjectID } from 'bson';
import { get } from 'svelte/store';

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

	await fetchApi('/api/category', {
		method: 'POST',
		body: JSON.stringify(newCategoryRow)
	});
};

// in-source test suites
if (import.meta.vitest) {
	const { it, expect, describe, vi } = import.meta.vitest;
	describe('adding categories in source', () => {
		it('should add a category when called', async () => {
			vi.mock('$lib/fetchApi');
			await addCategory('test');
			const val = get(allCategories);
			expect(val.length).toBe(1);
			expect(val[0].name).toBe('test');
		});
	});
}
