import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  clientNumber: {
    type: String,
    required: true,
    unique: true,
  },  address: { type: String, required: true },
  phone: { type: String },
  municipality: {
    type: String,
    required: true,
  },
   remarque: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  consultations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);