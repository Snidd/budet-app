import type { BudgetCategoryRows, BudgetElement } from '$model/StartingModel';
import { writable } from 'svelte/store';
import { allCategoryRows } from './allCategoryRows';

export const allElements = writable<BudgetElement[]>([]);

const exampleRows: BudgetCategoryRows[] = [];

const getElement = (
	name: string,
	total: number,
	month: number,
	categoryId: number,
	isOnCredit = false,
	recurring = true
): BudgetElement => {
	let row = exampleRows.find(
		(existing) => existing.categoryId === categoryId && existing.name === name
	);
	if (row === undefined) {
		row = {
			name: name,
			id: exampleRows.length,
			categoryId: categoryId
		};
		exampleRows.push(row);
	}

	return {
		categoryId: categoryId,
		rowId: row.id,
		month: month,
		total: total,
		isOnCredit: isOnCredit,
		recurring: recurring
	};
};

export const loadExampleData = () => {
	const exampleData: BudgetElement[] = [
		getElement('Magnus Lön', 34442, 0, 0),
		getElement('Magnus Lön', 33442, 1, 0),
		getElement('Magnus Lön', 32442, 2, 0),
		getElement('Mikaela Lön', 20000, 0, 0),
		getElement('Föräldradagar', 18568, 0, 0),
		getElement('Föräldradagar', 9500, 1, 0),
		getElement('Föräldradagar', 8500, 2, 0),
		getElement('Mikaela Lön', 20000, 0, 0),
		getElement('Barnbidrag', 1250, 0, 0),
		getElement('Barnbidrag', 1250, 1, 0),
		getElement('Barnbidrag', 1250, 2, 0),
		// boende
		getElement('Hyra', 4715, 0, 1),
		getElement('Hyra', 4715, 1, 1),
		getElement('Hyra', 4715, 2, 1),
		getElement('Garage', 1447, 0, 1),
		getElement('Garage', 1447, 1, 1),
		getElement('Garage', 1447, 2, 1),
		getElement('Ränta lägenheten', 2697, 0, 1),
		getElement('Ränta lägenheten', 2721, 1, 1),
		getElement('Ränta lägenheten', 2721, 2, 1),
		getElement('Ränta tomten', 7636, 0, 1),
		getElement('Ränta tomten', 9500, 1, 1),
		getElement('Ränta tomten', 9500, 2, 1),
		// mat
		getElement('Ica', 3500, 0, 2),
		getElement('Ica', 3500, 1, 2),
		getElement('Ica', 3500, 2, 2),
		getElement('Matkassar', 2397, 0, 2, true),
		getElement('Matkassar', 2700, 1, 2, true),
		getElement('Matkassar', 2700, 2, 2, true),
		// spar
		getElement('William', 2250, 0, 3),
		getElement('William', 2250, 1, 3),
		getElement('William', 2250, 2, 3),
		getElement('Rör du så dör du', 2000, 0, 3),
		getElement('Rör du så dör du', 2000, 1, 3),
		getElement('Rör du så dör du', 2000, 2, 3),
		getElement('Pension (mikaela)', 1000, 0, 3),
		getElement('Pension (mikaela)', 1000, 1, 3),
		getElement('Pension (mikaela)', 1000, 2, 3),
		// annat
		getElement('LUS', 1500, 2, 2, true, false)
	];

	allElements.set(exampleData);
	allCategoryRows.set(exampleRows);
};
