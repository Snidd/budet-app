export interface BudgetBasicElement {
	total: number;
	name: string;
	month: number;
	categoryId: number;
}

export interface BudgetTableElement extends BudgetBasicElement {
	show: boolean;
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
	id: number;
	isIncome: boolean;
}

export interface BudgetElement extends BudgetBasicElement {
	recurring: boolean;
	isOnCredit: boolean;
}
