import fetchApi from '$lib/fetchApi';
import { allInvoices } from '$lib/stores';
import type { BudgetInvoice } from '$model';
import { ObjectID } from 'bson';

export const addInvoice = async (text: string) => {
	const id = new ObjectID();

	const newInvoice: BudgetInvoice = {
		_id: id.toString(),
		text: text,
		current: 0,
		total: 0,
		done: false,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	allInvoices.update((invoices) => {
		if (invoices === undefined) invoices = [];
		invoices.push(newInvoice);
		return invoices;
	});

	await fetchApi('/api/invoice', {
		method: 'POST',
		body: JSON.stringify(newInvoice)
	});
};
