import fetchApi from '$lib/fetchApi';
import type { BudgetInvoice } from '$model';
import { derived, writable } from 'svelte/store';

export const allInvoices = writable<BudgetInvoice[]>([], (set) => {
	fetchApi(`/api/invoices`, {
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => set(data));
});

export const activeInvoices = derived(allInvoices, ($allInvoices) => {
	return $allInvoices.filter((invoice) => !invoice.done);
});

export const inactiveInvoices = derived(allInvoices, ($allInvoices) => {
	return $allInvoices.filter((invoice) => invoice.done);
});
