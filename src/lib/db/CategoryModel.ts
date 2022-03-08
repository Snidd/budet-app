import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: String,
	isIncome: Boolean,
	containsCreditCopies: Boolean,
	index: Number
});

export const CategoryModel = mongoose.model('Category', categorySchema);
