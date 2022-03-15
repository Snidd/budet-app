import fetchApi from '$lib/fetchApi';
import { allMonths } from '$lib/stores/allMonths';
import { get } from 'svelte/store';

export const deleteMonth = async () => {
	const months = get(allMonths);
	if (months === undefined || months.length === 0) return [];
	const sortedMonths = months.sort((a, b) => a.month - b.month);
	const lastMonth = sortedMonths[sortedMonths.length - 1];

	allMonths.update((months) => {
		return months.filter((month) => month.month !== lastMonth.month);
	});

	await fetchApi(`/api/month/${lastMonth.year}/${lastMonth.month}`, {
		method: 'DELETE'
	});
};

// in-source test suites
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('can delete a month', async () => {
		allMonths.set([
			{ month: 0, year: 2020 },
			{ month: 1, year: 2020 }
		]);
		await deleteMonth();
		const months = get(allMonths);
		expect(months.length).toBe(1);
		expect(months[0].month).toBe(0);
	});
}
