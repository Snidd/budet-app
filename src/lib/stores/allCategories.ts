import type { BudgetCategory } from '$model/BudgetCategory';
import { writable } from 'svelte/store';

export const allCategories = writable<BudgetCategory[]>([
	{
		id: 0,
		isIncome: true,
		name: 'Inkomster'
	},
	{
		id: 1,
		isIncome: false,
		name: 'Boende'
	},
	{
		id: 2,
		isIncome: false,
		name: 'Mat'
	},
	{
		id: 3,
		isIncome: false,
		name: 'Spar'
	},
	{
		id: 4,
		isIncome: false,
		name: 'Magnus'
	}
]);
