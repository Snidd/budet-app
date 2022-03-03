import { ElementModel } from '$lib/db/ElementModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler<{ categoryId: string; rowId: string }> = async ({ params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for elements...`);
		const elements = await ElementModel.find({
			categoryId: params.categoryId,
			rowId: params.rowId
		});

		return {
			body: elements
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

export const post: RequestHandler<{ categoryId: string; rowId: string }> = async ({
	request,
	params
}) => {
	try {
		const body = await request.json();
		const uri = import.meta.env.VITE_MONGODB_URL;
		await mongoose.connect(uri);

		body.categoryId = new mongoose.Types.ObjectId(params.categoryId);
		body.rowId = new mongoose.Types.ObjectId(params.rowId);

		const newElement = new ElementModel(body);
		newElement.save();

		return {
			body: newElement,
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
