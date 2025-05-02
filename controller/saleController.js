import Sale from '../models/sales.js';

// Créer une vente
export const createSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    console.error('Error in createSale:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la vente', error });
  }
};

// Obtenir toutes les ventes
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des ventes', error });
  }
};

// Obtenir une vente spécifique
export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Vente non trouvée' });
    res.status(200).json(sale);
  } catch (error) {
    console.error('Error in getSale:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la vente', error });
  }
};

// Mettre à jour une vente
export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).json({ message: 'Vente non trouvée' });
    res.status(200).json(sale);
  } catch (error) {
    console.error('Error in updateSale:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la vente', error });
  }
};

// Supprimer une vente
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Vente non trouvée' });
    res.status(200).json({ message: 'Vente supprimée' });
  } catch (error) {
    console.error('Error in deleteSale:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la vente', error });
  }
};