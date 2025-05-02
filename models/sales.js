import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  invoiceNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  referenceNumber: { type: String, required: true },
  productName: { type: String, required: true },
  lotNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Sale', saleSchema);