import type { BudgetBasicElement } from './BudgetBasicElement';

export interface BudgetElement extends BudgetBasicElement {
	recurring: boolean;
	isOnCredit: boolean;
}
