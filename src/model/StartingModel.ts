export interface BudgetBasicElement {
	total: number;
	month: number;
	categoryId: number;
	rowId: number;
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

export interface BudgetCategoryRows {
	name: string;
	id: number;
	categoryId: number;
	recurring: boolean;
	isOnCredit: boolean;
}

export interface BudgetElement extends BudgetBasicElement {
	recurring: boolean;
	isOnCredit: boolean;
}
