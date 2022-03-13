import fetchApi from '$lib/fetchApi';
import { allMonths } from '$lib/stores';
import type { BudgetMonth } from '$model';
import { get } from 'svelte/store';

//TODO: Make adding a month also create elements for recurring rows.
export const addMonth = async (year: number) => {
	let newMonth: BudgetMonth;
	allMonths.update((months) => {
		if (months === undefined) {
			months = [];
		}
		const orderedMonths = months
			.filter((month) => month.year === year)
			.sort((a, b) => a.month - b.month);
		if (orderedMonths.length === 0) {
			newMonth = {
				month: 0,
				year: year
			};
			months.push(newMonth);
			return months;
		}

		const lastMonth = orderedMonths[orderedMonths.length - 1].month;
		newMonth = {
			month: lastMonth + 1,
			year: year
		};
		months.push(newMonth);

		return months;
	});

	if (newMonth !== undefined) {
		await fetchApi('/api/months', {
			method: 'POST',
			body: JSON.stringify(newMonth)
		});
	}
};

// in-source test suites
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('can add month when none exists', async () => {
		await addMonth(2020);
		const months = get(allMonths);
		expect(months.length).toBe(1);
	});
	it('can add month when one exists', async () => {
		allMonths.set([
			{
				month: 0,
				year: 2020
			}
		]);
		await addMonth(2020);
		const months = get(allMonths);
		expect(months.length).toBe(2);
		expect(months[1].month).toBe(1);
	});
}
