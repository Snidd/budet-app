import fetchApi from '$lib/fetchApi';
import { allCategoryRows } from '$lib/stores/allCategoryRows';
import type { BudgetCategoryRow } from '$model';

export const updateRowIndex = (rowId: string, index: number) => {
	allCategoryRows.update((rows) => {
		const updatedIndexRows = rows.map((_row) => {
			if (_row._id === rowId) {
				_row.index = index;
			} else {
				if (_row.index >= index) {
					_row.index++;
					fetchApi(`/api/row/${_row._id}`, {
						method: 'PUT',
						body: JSON.stringify({ index: _row.index })
					});
				}
			}
			return _row;
		});
		return updatedIndexRows;
	});
};
