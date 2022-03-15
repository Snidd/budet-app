import { CategoryModel } from '$lib/db/CategoryModel';
import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import { ElementModel } from '$lib/db/ElementModel';
import { MonthModel } from '$lib/db/MonthModel';
import { allCategories } from '$lib/stores/allCategories';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		const categories = await CategoryModel.find({}).sort('index');

		return {
			body: {
				categories: categories
			}
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
