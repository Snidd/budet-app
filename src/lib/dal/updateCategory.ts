import { allCategories } from '$lib/stores/allCategories';
import type { BudgetCategory } from '$model';

export const updateCategory = async (id: string, updates: Partial<BudgetCategory>) => {
	allCategories.update((categories) => {
		const categoryIndex = categories.findIndex((cat) => cat._id === id);
		if (categoryIndex === -1) return;
		categories[categoryIndex] = { ...categories[categoryIndex], ...updates };
		fetch(`/api/category/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updates)
		});
		return categories;
	});
};
