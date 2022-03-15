import { InvoiceModel } from '$lib/db/InvoiceModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const put: RequestHandler<{ invoiceId: string }> = async ({ request, params }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		const updated = await InvoiceModel.findByIdAndUpdate(params.invoiceId, body);

		return {
			body: updated,
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

export const del: RequestHandler<{ invoiceId: string }> = async ({ request, params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;
		await mongoose.connect(uri);
		const deleted = await InvoiceModel.findByIdAndDelete(params.invoiceId);

		return {
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
