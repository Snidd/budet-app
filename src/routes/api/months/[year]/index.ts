import { MonthModel } from '$lib/db/MonthModel';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const get: RequestHandler<{ year: string }> = async ({ params }) => {
	try {
		const uri = import.meta.env.VITE_MONGODB_URL;

		await mongoose.connect(uri);
		console.log(`searching for months...`);
		const months = await MonthModel.find({ year: params.year }).sort('month');

		return {
			body: months
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

export const post: RequestHandler<{ year: string }> = async ({ request, params }) => {
	try {
		const body = await request.json();

		const uri = import.meta.env.VITE_MONGODB_URL;
		await mongoose.connect(uri);

		body.year = params.year;
		console.log(JSON.stringify(body));
		const newMonth = new MonthModel(body);
		newMonth.save();

		return {
			body: newMonth,
			status: 200
		};
	} catch (err: any) {
		console.log('error ' + err);
		return {
			status: 500,
			body: {
				error: err.message
			}
		};
	}
};
