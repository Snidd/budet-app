import mongoose from 'mongoose';

const categoryRpwModel = new mongoose.Schema({
	name: String,
	categoryId: mongoose.Types.ObjectId,
	recurring: Boolean,
	isOnCredit: Boolean,
	isIncome: Boolean
});

export const CategoryRowModel = mongoose.model('CategoryRow', categoryRpwModel);
