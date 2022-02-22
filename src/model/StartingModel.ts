export interface BudgetMonth {
	month: number;
	categories: BudgetCategory[];
	incomes: BudgetBasicElement[];
}

export interface BudgetBasicElement {
	total: number;
	description: string;
}

export const months = [
	'Januari',
	'Februari',
	'Mars',
	'April',
	'Maj',
	'Juni',
	'Juli',
	'Augusti',
	'September',
	'Oktober',
	'November',
	'December'
];

export interface BudgetCategory {
	name: string;
	elements: BudgetElement[];
}

export interface BudgetElement extends BudgetBasicElement {
	recurring: boolean;
	isOnCredit: boolean;
}
