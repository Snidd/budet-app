import mongoose from 'mongoose';

const monthModel = new mongoose.Schema({
	month: Number,
	year: Number
});

export const MonthModel = mongoose.model('Month', monthModel);
