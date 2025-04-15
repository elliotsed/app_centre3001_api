import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, default: Date.now },
  allergies: { type: String, default: 'Aucune' },
  artificialLimb: { type: Boolean, default: false },
  pacemaker: { type: Boolean, default: false },
  bloodPressure: { type: String, default: 'Normale' },
  covidOrVirus: { type: String, default: 'Aucun' },
  painAreas: [{
    bodyPart: { type: String, required: true }, // Ex: "Épaule gauche"
    direction: { type: String }, // Ex: "Vers le bras"
    intensity: { type: Number, min: 0, max: 100 }, // % douleur actuelle
    maxIntensity: { type: Number, min: 0, max: 100 }, // % douleur max
  }],
  scars: [{
    bodyPart: { type: String, required: true }, // Ex: "Genou droit"
    description: { type: String }, // Ex: "Cicatrice chirurgicale"
  }],
  consultationReason: { type: String, required: true },
  practitionerObservations: { type: String },
  problemDuration: { type: String }, // Ex: "2 semaines"
  medicalIndication: { type: String }, // Indication du médecin/thérapeute
  medication: { type: String, default: 'Aucune' },
  disease: { type: String, default: 'Aucune' },
  treatmentDetails: { type: String },
  clientComment: { type: String },
  improvementPercentage: { type: Number, min: 0, max: 100, default: 0 },
});

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);