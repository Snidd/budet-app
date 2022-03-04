import type { BudgetCategory } from '$model/BudgetCategory';
import { writable } from 'svelte/store';

export const allCategories = writable<BudgetCategory[]>();

/*
[
	{
		id: 0,
		isIncome: true,
		name: 'Inkomster',
		containsCreditCopies: false
	},
	{
		id: 1,
		isIncome: false,
		name: 'Boende',
		containsCreditCopies: false
	},
	{
		id: 2,
		isIncome: false,
		name: 'Mat',
		containsCreditCopies: false
	},
	{
		id: 3,
		isIncome: false,
		name: 'Spar',
		containsCreditCopies: false
	},
	{
		id: 4,
		isIncome: false,
		name: 'Magnus',
		containsCreditCopies: false
	},
	{
		id: 5,
		isIncome: false,
		containsCreditCopies: true,
		name: 're:member'
	}
]
*/
