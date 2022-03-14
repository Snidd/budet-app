import fetchApi from '$lib/fetchApi';
import { allCategoryRows, allElements, allMonths } from '$lib/stores';
import type { BudgetMonth } from '$model';
import { get } from 'svelte/store';

const getNewMonth = (year: number): BudgetMonth => {
	const months = get(allMonths);
	if (months === undefined) {
		return {
			month: 0,
			year: year
		};
	}
	const orderedMonths = months
		.filter((month) => month.year === year)
		.sort((a, b) => a.month - b.month);

	if (orderedMonths.length === 0) {
		return {
			month: 0,
			year: year
		};
	}

	return {
		month: orderedMonths[orderedMonths.length - 1].month + 1,
		year: year
	};
};

export const addMonth = async (year: number) => {
	const newMonth = getNewMonth(year);
	const rows = get(allCategoryRows);

	if (rows !== undefined && rows.length > 0 && newMonth.month > 0) {
		const recurringRows = rows.filter((row) => row.recurring);
		const lastMonth = newMonth.month - 1;
		const elements = get(allElements);
		if (elements !== undefined && elements.length > 0) {
			const elementsToCopy = elements.filter(
				(elem) => recurringRows.findIndex((row) => row._id === elem.rowId) > -1
			);
			const newElements = elementsToCopy.map((elem) => {
				elem.month = newMonth.month;
				return elem;
			});
			if (newElements.length > 0) {
				allElements.update((elements) => {
					return elements.concat(newElements);
				});
				newElements.forEach((elem) => {
					fetchApi(`/api/row/${elem.rowId}/${elem.month}`, {
						method: 'PUT',
						body: elem.total.toString()
					});
				});
			}
		}
	}

	allMonths.update((months) => {
		if (months !== undefined) {
			months.push(newMonth);
		} else {
			return [newMonth];
		}
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
	it('can get new month', async () => {
		expect(getNewMonth(2020).month).toBe(0);
	});

	it('can get new month when one exists', async () => {
		allMonths.set([{ month: 0, year: 2020 }]);
		expect(getNewMonth(2020).month).toBe(1);
	});

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

	it('can add month and get elements for recurring rows', async () => {
		allMonths.set([
			{
				month: 0,
				year: 2020
			}
		]);
		allCategoryRows.set([
			{
				_id: '1',
				categoryId: '1',
				index: 1,
				isIncome: false,
				isOnCredit: false,
				name: 'Test1',
				recurring: true
			},
			{
				_id: '2',
				categoryId: '1',
				index: 1,
				isIncome: false,
				isOnCredit: false,
				name: 'Test2',
				recurring: false
			}
		]);
		allElements.set([
			{
				categoryId: '1',
				month: 0,
				rowId: '1',
				total: 100
			},
			{
				categoryId: '1',
				month: 0,
				rowId: '2',
				total: 100
			}
		]);
		await addMonth(2020);
		const elements = get(allElements);
		expect(elements.length).toBe(3);
		expect(elements[2].month).toBe(1);
		expect(elements[2].total).toBe(100);
	});
}
