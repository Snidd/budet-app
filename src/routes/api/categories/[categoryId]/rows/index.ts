import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler<{ categoryId: string }> = async ({ params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for category rows...`);
		const categoryRows = await CategoryRowModel.find({ categoryId: params.categoryId });

		return {
			body: categoryRows
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

export const post: RequestHandler<{ categoryId: string }> = async ({ request, params }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);

		body.categoryId = new mongoose.Types.ObjectId(params.categoryId);

		const newCategory = new CategoryRowModel(body);
		newCategory.save();

		return {
			body: newCategory,
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
