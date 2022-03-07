import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const put: RequestHandler<{ rowId: string }> = async ({ request, params }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		const updated = await CategoryRowModel.findByIdAndUpdate(params.rowId, body);

		return {
			body: updated,
			status: 200
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

export const del: RequestHandler<{ rowId: string }> = async ({ request, params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;
		await mongoose.connect(uri);
		const updated = await CategoryRowModel.findByIdAndDelete(params.rowId);

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
