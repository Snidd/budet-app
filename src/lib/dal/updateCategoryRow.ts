import fetchApi from '$lib/fetchApi';
import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';

export const updateCategoryRow = (id: string, updatedRow: Partial<BudgetCategoryRow>) => {
	allCategoryRows.update((rows) => {
		const idx = rows.findIndex((row) => row._id === id);
		rows[idx] = { ...rows[idx], ...updatedRow };
		return rows;
	});
	fetchApi(`/api/row/${id}`, {
		method: 'PUT',
		body: JSON.stringify(updatedRow)
	});
};
