import { InvoiceModel } from '$lib/db/InvoiceModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		const invoices = await InvoiceModel.find({}).sort('index');

		return {
			body: invoices
		};
	} catch (err: any) {
		console.log('error ' + err);
		return {
			status: 500,
			body: {
				error: JSON.stringify(err)
			}
		};
	}
};

export const post: RequestHandler<{}> = async ({ request, params }) => {
	try {
		const body = await request.json();
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);

		const newInvoice = new InvoiceModel(body);
		await newInvoice.save();

		return {
			body: newInvoice,
			status: 204
		};
	} catch (err: any) {
		console.log('error ' + err);
		return {
			status: 500,
			body: {
				error: JSON.stringify(err)
			}
		};
	}
};
