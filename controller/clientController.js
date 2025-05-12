import Client from '../models/Client.js';
import Consultation from "../models/Consultation.js"; ;

// Générer un numéro de client unique
const generateClientNumber = async () => {
  const count = await Client.countDocuments();
  return `CL${(count + 1).toString().padStart(6, '0')}`; // Ex: CL000001
};

// Créer un client
export const createClient = async (req, res) => {
  try {
    const clientNumber = await generateClientNumber();
    const client = new Client({ ...req.body, clientNumber });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error('Error in createClient:', error);
    res.status(400).json({ message: 'Erreur lors de la création du client', error });
  }
};

// Obtenir tous les clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('consultations');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des clients', error });
  }
};

// Obtenir un client spécifique
export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('consultations');
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du client', error });
  }
};

// Mettre à jour un client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du client', error });
  }
};

// Supprimer un client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    await Consultation.deleteMany({ clientId: req.params.id });
    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du client', error });
  }
};