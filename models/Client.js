import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  consultations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);