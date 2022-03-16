import fetchApi from '$lib/fetchApi';
import { allInvoices } from '$lib/stores';
import type { BudgetInvoice } from '$model';

export const updateInvoice = (id: string, updatedInvoice: Partial<BudgetInvoice>) => {
	updatedInvoice = { ...updatedInvoice, new: false };
	allInvoices.update((invoices) => {
		const idx = invoices.findIndex((invoice) => invoice._id === id);
		invoices[idx] = { ...invoices[idx], ...updatedInvoice };
		return invoices;
	});
	fetchApi(`/api/invoice/${id}`, {
		method: 'PUT',
		body: JSON.stringify(updatedInvoice)
	});
};
