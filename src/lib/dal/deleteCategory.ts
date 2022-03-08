import { allCategories } from '$lib/stores/allCategories';

export const deleteCategory = (categoryId: string) => {
	allCategories.update((categories) => {
		return categories.filter((category) => category._id !== categoryId);
	});

	fetch(`/api/category/${categoryId}`, {
		method: 'DELETE'
	});
};
