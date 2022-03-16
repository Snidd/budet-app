export interface BudgetInvoice {
	_id: string;
	total: number;
	current: number;
	text: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
	new?: boolean;
}
