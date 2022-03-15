import mongoose from 'mongoose';

const invoiceModel = new mongoose.Schema(
	{
		total: Number,
		current: Number,
		text: String,
		done: Boolean
	},
	{
		timestamps: true
	}
);

export const InvoiceModel = mongoose.model('Invoice', invoiceModel);
