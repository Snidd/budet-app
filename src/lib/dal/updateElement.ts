import fetchApi from '$lib/fetchApi';
import { allCategories, allCategoryRows, allElements } from '$lib/stores';
import { get } from 'svelte/store';

export const updateElement = (total: number, rowId: string, month: number) => {
	allElements.update((elements) => {
		const idx = elements.findIndex((el) => el.rowId === rowId && el.month === month);
		if (idx === -1) {
			const rows = get(allCategoryRows);
			const row = rows.find((_row) => _row._id === rowId);
			const newElement = {
				categoryId: row.categoryId,
				month: month,
				rowId: row._id,
				total: total
			};
			elements.push(newElement);
			fetchApi(`/api/row/${rowId}/${month}`, {
				method: 'POST',
				body: JSON.stringify(newElement)
			});
		} else {
			elements[idx].total = total;
			fetchApi(`/api/row/${rowId}/${month}`, {
				method: 'PUT',
				body: JSON.stringify({ total: total })
			});
		}
		return elements;
	});
};
