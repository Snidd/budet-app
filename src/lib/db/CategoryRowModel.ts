import mongoose from 'mongoose';

const categoryRowModel = new mongoose.Schema({
	name: String,
	categoryId: mongoose.Types.ObjectId,
	recurring: Boolean,
	isOnCredit: Boolean,
	isIncome: Boolean,
	index: Number
});

export const CategoryRowModel = mongoose.model('CategoryRow', categoryRowModel);
