import { ElementModel } from '$lib/db/ElementModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler = async ({}) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for elements...`);
		const elements = await ElementModel.find({});

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
