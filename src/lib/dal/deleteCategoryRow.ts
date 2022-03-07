import { allCategoryRows } from '$lib/stores/allCategoryRows';

export const deleteCategoryRow = (rowId: string) => {
	allCategoryRows.update((rows) => {
		return rows.filter((row) => row._id !== rowId);
	});

	fetch(`/api/row/${rowId}`, {
		method: 'DELETE'
	});
};
