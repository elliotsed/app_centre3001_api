import express from 'express'
import { Register, Login, Auth } from '../controller/userController.js'
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js'
import { createContact, getContacts, getContact, updateContact, deleteContact } from '../controller/contactController.js'
import { getInvoices,getInvoice,deleteInvoice,updateInvoice,createInvoice } from '../controller/invoiceController.js'
const router = express.Router()


// user routes
router.post("/register", [
    body('name').trim().notEmpty().withMessage("Le nom est requis"),
    body('email').trim().notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email n'est pas valide!!!"),
    body('password').trim().notEmpty().withMessage("Le mot de passe est requis")
        .isLength({ min: 8, max: 30 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
], Register)

router.post("/login", [
    body('email').trim().notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email n'est pas valide!!!"),
    body('password').trim().notEmpty().withMessage("Le mot de passe est requis")
        .isLength({ min: 8, max: 30 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
], Login)

router.get("/verify", VerifyUser, Auth)

// contact routes
router.post("/add-contact", VerifyUser, createContact)
router.get("/contacts", VerifyUser, getContacts)
router.get("/contacts/:id", VerifyUser, getContact)
router.put("/update-contact/:id", VerifyUser, updateContact)
router.delete("/contact/:id", VerifyUser, deleteContact)


// Invoices Routes 
router.get("/invoices", VerifyUser, getInvoices)
router.get("/invoices/:id", VerifyUser, getInvoice)
router.post("/invoices", createInvoice)
router.put("/invoices/:id", VerifyUser, updateInvoice)
router.delete("/invoices/:id", VerifyUser, deleteInvoice)

export { router as Router }