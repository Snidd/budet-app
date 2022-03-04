import { CategoryModel } from '$lib/db/CategoryModel';
import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import { ElementModel } from '$lib/db/ElementModel';
import { MonthModel } from '$lib/db/MonthModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for categories...`);
		const categories = await CategoryModel.find({});

		console.log(`searching for months...`);
		const months = await MonthModel.find({}).sort('month');

		console.log(`searching for categoryRows...`);
		const categoryRows = await CategoryRowModel.find({});

		console.log(`searching for elements...`);
		const elements = await ElementModel.find({});

		return {
			body: {
				categories: categories,
				categoryRows: categoryRows,
				elements: elements,
				months: months
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
