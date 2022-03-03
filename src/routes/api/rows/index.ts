import { CategoryRowModel } from '$lib/db/CategoryRowModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for category rows...`);
		const categoryRows = await CategoryRowModel.find({});

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
