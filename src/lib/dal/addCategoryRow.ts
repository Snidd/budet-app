import fetchApi from '$lib/fetchApi';
import { allCategories, allCategoryRows } from '$lib/stores';
import type { BudgetCategoryRow } from '$model';
import { ObjectID } from 'bson';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { updateRowIndex } from './updateRowIndex';

export const addCategoryRow = async (
	categoryId: string,
	preRowIndex: number | undefined,
	before: boolean = true
) => {
	const last = preRowIndex === undefined;
	const id = new ObjectID();

	const newCategoryRow: BudgetCategoryRow = {
		_id: id.toString(),
		categoryId: categoryId,
		isOnCredit: false,
		recurring: false,
		index: -1,
		name: 'Namnlös',
		isIncome: false
	};

	allCategoryRows.update((rows) => {
		if (last) {
			preRowIndex = rows
				.filter((row) => row.categoryId === categoryId)
				.reduce((prev, cur, idx) => {
					console.log(idx);
					if (cur.index > prev && cur.index !== undefined) {
						return cur.index;
					}
					return prev;
				}, 1);
			preRowIndex++;
		}

		if (before && !last) {
			preRowIndex--;
		}

		newCategoryRow.index = preRowIndex;

		rows.push(newCategoryRow);
		return rows;
	});

	await tick();

	updateRowIndex(newCategoryRow._id, newCategoryRow.index);

	fetchApi(`/api/category/${categoryId}/row`, {
		method: 'POST',
		body: JSON.stringify(newCategoryRow)
	});
};

// in-source test suites
if (import.meta.vitest) {
	const { it, expect, describe, vi } = import.meta.vitest;
	describe('adding category rows in-source', () => {
		it('should add a category row at index 2', async () => {
			allCategories.set([
				{ _id: '1', containsCreditCopies: false, index: 1, isIncome: false, name: 'Test' }
			]);
			allCategoryRows.set([
				{
					_id: '1',
					categoryId: '1',
					index: 1,
					isIncome: false,
					isOnCredit: false,
					name: 'Test1',
					recurring: false
				}
			]);
			await addCategoryRow('1', 2, false);
			const val = get(allCategoryRows);
			expect(val.length).toBe(2);
			expect(val[1].name).toBe('Namnlös');
			expect(val[1].index).toBe(2);
		});

		it('should add a category row last', async () => {
			allCategories.set([
				{ _id: '1', containsCreditCopies: false, index: 1, isIncome: false, name: 'Test' }
			]);
			allCategoryRows.set([
				{
					_id: '1',
					categoryId: '1',
					index: 1,
					isIncome: false,
					isOnCredit: false,
					name: 'Test1',
					recurring: false
				},
				{
					_id: '2',
					categoryId: '1',
					index: 2,
					isIncome: false,
					isOnCredit: false,
					name: 'Test2',
					recurring: false
				}
			]);
			await addCategoryRow('1', undefined);
			const val = get(allCategoryRows);
			expect(val.length).toBe(3);
			expect(val[2].name).toBe('Namnlös');
			expect(val[2].index).toBe(3);
			expect(val[0].index).toBe(1);
			expect(val[1].index).toBe(2);
		});

		it('should add a category row at index 1', async () => {
			allCategories.set([
				{ _id: '1', containsCreditCopies: false, index: 1, isIncome: false, name: 'Test' }
			]);
			allCategoryRows.set([
				{
					_id: '1',
					categoryId: '1',
					index: 1,
					isIncome: false,
					isOnCredit: false,
					name: 'Test1',
					recurring: false
				}
			]);
			await addCategoryRow('1', 1, false);
			const val = get(allCategoryRows);
			expect(val.length).toBe(2);
			expect(val[1].name).toBe('Namnlös');
			expect(val[1].index).toBe(1);
			expect(val[0].index).toBe(2);
		});
	});
}
