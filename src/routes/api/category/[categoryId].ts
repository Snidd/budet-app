import { CategoryModel } from '$lib/db/CategoryModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const put: RequestHandler<{ categoryId: string }> = async ({ request, params }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		await CategoryModel.findByIdAndUpdate(params.categoryId, body);

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

export const del: RequestHandler<{ categoryId: string }> = async ({ request, params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;
		await mongoose.connect(uri);
		const updated = await CategoryModel.findByIdAndDelete(params.categoryId);

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
