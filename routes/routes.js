import express from 'express';
import { Register, Login, Auth } from '../controller/userController.js';
import { body } from 'express-validator';
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createContact, getContacts, getContact, updateContact, deleteContact } from '../controller/contactController.js';
import { getInvoices, getInvoice, deleteInvoice, updateInvoice, createInvoice } from '../controller/invoiceController.js';
import { createClient, getClients, getClient, updateClient, deleteClient } from '../controller/clientController.js';
import { createConsultation, getConsultations, getConsultation, updateConsultation, deleteConsultation } from '../controller/consultationController.js';
import { createSale, getSales, getSale, updateSale, deleteSale } from '../controller/saleController.js';

const router = express.Router();

// User routes
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Le nom est requis'),
    body('email').trim().notEmpty().withMessage("L'email est requis").isEmail().withMessage("L'email n'est pas valide!!!"),
    body('password').trim().notEmpty().withMessage('Le mot de passe est requis').isLength({ min: 8, max: 30 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  Register
);

router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage("L'email est requis").isEmail().withMessage("L'email n'est pas valide!!!"),
    body('password').trim().notEmpty().withMessage('Le mot de passe est requis').isLength({ min: 8, max: 30 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  Login
);

router.get('/verify', VerifyUser, Auth);

// Contact routes
router.post('/add-contact', VerifyUser, createContact);
router.get('/contacts', VerifyUser, getContacts);
router.get('/contacts/:id', VerifyUser, getContact);
router.put('/update-contact/:id', VerifyUser, updateContact);
router.delete('/contact/:id', VerifyUser, deleteContact);

// Invoice routes
router.get('/invoices', VerifyUser, getInvoices);
router.get('/invoices/:id', VerifyUser, getInvoice);
router.post('/invoices', VerifyUser, createInvoice);
router.put('/invoices/:id', VerifyUser, updateInvoice);
router.delete('/invoices/:id', VerifyUser, deleteInvoice);

// Client routes
router.post('/add-client', VerifyUser, createClient);
router.get('/clients', VerifyUser, getClients);
router.get('/clients/:id', VerifyUser, getClient);
router.put('/update-client/:id', VerifyUser, updateClient);
router.delete('/client/:id', VerifyUser, deleteClient);

// Consultation routes
router.post('/add-consultation', VerifyUser, createConsultation);
router.get('/consultations/:clientId', VerifyUser, getConsultations);
router.get('/consultation/:id', VerifyUser, getConsultation);
router.put('/update-consultation/:id', VerifyUser, updateConsultation);
router.delete('/consultation/:id', VerifyUser, deleteConsultation);

// Sales routes
router.post(
  '/sales',
  [
    body('date').trim().notEmpty().withMessage('La date est requise').isISO8601().withMessage('La date doit être au format ISO'),
    body('invoiceNumber').trim().notEmpty().withMessage('Le numéro de facture est requis'),
    body('firstName').trim().notEmpty().withMessage('Le prénom est requis'),
    body('lastName').trim().notEmpty().withMessage('Le nom est requis'),
    body('referenceNumber').trim().notEmpty().withMessage('Le numéro de référence est requis'),
    body('productName').trim().notEmpty().withMessage('Le nom du produit est requis'),
    body('lotNumber').trim().notEmpty().withMessage('Le numéro de lot est requis'),
  ],
  VerifyUser,
  createSale
);
router.get('/sales', VerifyUser, getSales);
router.get('/sales/:id', VerifyUser, getSale);
router.put('/sales/:id', VerifyUser, updateSale);
router.delete('/sales/:id', VerifyUser, deleteSale);

export { router as Router };