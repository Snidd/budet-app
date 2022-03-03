import mongoose from 'mongoose';

const elementModel = new mongoose.Schema({
	categoryId: mongoose.Types.ObjectId,
	rowId: mongoose.Types.ObjectId,
	month: Number,
	total: Number
});

export const ElementModel = mongoose.model('Element', elementModel);
