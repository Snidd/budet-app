import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import { ElementModel } from '$lib/db/ElementModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const put: RequestHandler<{ rowId: string; month: string }> = async ({
	request,
	params
}) => {
	try {
		const body = await request.json();
		const uri = import.meta.env.VITE_MONGODB_URL;

		const search = { rowId: params.rowId, month: params.month };

		await mongoose.connect(uri);
		const updated = await ElementModel.findOneAndUpdate(search, body);

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

export const post: RequestHandler<{ rowId: string; month: string }> = async ({
	request,
	params
}) => {
	try {
		const body = await request.json();
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);

		body.rowId = params.rowId;
		body.month = params.month;

		const newElement = new ElementModel(body);
		await newElement.save();

		return {
			body: newElement,
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
