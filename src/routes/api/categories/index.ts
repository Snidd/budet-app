import { CategoryModel } from '$lib/db/CategoryModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for categories...`);
		const categories = await CategoryModel.find({});

		return {
			body: categories
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

export const post: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);

		const newCategory = new CategoryModel(body);
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
