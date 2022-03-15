import { allCategories } from '$lib/stores/allCategories';

export const updateCategoryIndex = (categoryId: string, index: number) => {
	allCategories.update((categories) => {
		const updatedIndexRows = categories.map((_cat, _index) => {
			if (_cat._id === categoryId) {
				_cat.index = index;
				fetch(`/api/category/${_cat._id}`, {
					method: 'PUT',
					body: JSON.stringify({ index: _cat.index })
				});
			} else {
				if (_cat.index >= index) {
					_cat.index++;
					fetch(`/api/category/${_cat._id}`, {
						method: 'PUT',
						body: JSON.stringify({ index: _cat.index })
					});
				}
			}
			return _cat;
		});
		return updatedIndexRows;
	});
};
