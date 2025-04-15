import Consultation from '../models/Consultation.js';
import Client from '../models/Client.js';

// Créer une consultation
export const createConsultation = async (req, res) => {
  try {
    const { clientId, ...consultationData } = req.body;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    const consultation = new Consultation({ clientId, ...consultationData });
    await consultation.save();
    client.consultations.push(consultation._id);
    await client.save();
    res.status(201).json(consultation);
  } catch (error) {
    console.error('Error in createConsultation:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la consultation', error });
  }
};

// Obtenir toutes les consultations d’un client
export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ clientId: req.params.clientId });
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error in getConsultations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des consultations', error });
  }
};

// Obtenir une consultation spécifique
export const getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Consultation non trouvée' });
    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error in getConsultation:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la consultation', error });
  }
};

// Mettre à jour une consultation
export const updateConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!consultation) return res.status(404).json({ message: 'Consultation non trouvée' });
    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error in updateConsultation:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la consultation', error });
  }
};

// Supprimer une consultation
export const deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Consultation non trouvée' });
    await Client.updateOne(
      { consultations: req.params.id },
      { $pull: { consultations: req.params.id } }
    );
    res.status(200).json({ message: 'Consultation supprimée' });
  } catch (error) {
    console.error('Error in deleteConsultation:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la consultation', error });
  }
};