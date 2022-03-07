import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';
import { ObjectID } from 'bson';
import { tick } from 'svelte';
import { updateRowIndex } from './updateRowIndex';

export const addCategoryRow = async (
	categoryId: string,
	preRowIndex: number | undefined,
	before: boolean = true
) => {
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
		if (preRowIndex === undefined) {
			preRowIndex = rows
				.filter((row) => row.categoryId === categoryId)
				.reduce((prev, cur, idx) => {
					console.log(idx);
					if (cur.index > prev && cur.index !== undefined) {
						return cur.index;
					}
					return prev;
				}, 1);
		}

		console.log(`preRowIndex: ${preRowIndex}`);

		if (before) {
			preRowIndex--;
		}

		newCategoryRow.index = preRowIndex;

		rows.push(newCategoryRow);
		return rows;
	});

	await tick();

	updateRowIndex(newCategoryRow._id, newCategoryRow.index);

	fetch(`/api/category/${categoryId}/row`, {
		method: 'POST',
		body: JSON.stringify(newCategoryRow)
	});
};
