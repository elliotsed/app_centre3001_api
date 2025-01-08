import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: { // Numéro de facture
        type: String,
        unique: true,
    },
    issueDate: { // Date de facturation
        type: Date,
        required: true,
        default: Date.now, // Default to current date
    },
    orderRef: { // Référence de commande
        type: String,
    },
    orderDate: { // Date de commande
        type: Date,
    },
    deliveryAddress: { // Livraison Address
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    products: [
        {
            reference: { // Référence
                type: String,
                required: true,
            },
            name: { // Nom du produit
                type: String,
                required: true,
            },
            taxRateOne: { // Taux de taxe
                type: Number,
                required: true,
            },
            taxRateTwo: { // Taux de taxe
                type: Number,
                required: true,
            },
            unitPriceExclTax: { // Prix unitaire (HT)
                type: Number,
                required: true,
            },
            quantity: { // Quantité
                type: Number,
                required: true,
            },
            totalExclTax: { // Total (HT)
                type: Number,
                required: true,
            },
        },
    ],
    carrierName: { // Nom du transporteur
        type: String,
    },
    shippingFees: { // Frais de livraison
        type: Number,
        default: 0,
    },
    paymentMethod: { // Moyen de paiement
        type: String,
        required: true,
    },
    totalProductsExclTax: { // Total produits (HT)
        type: Number,
        required: true,
    },
    totalTax: { // Total des taxes
        type: Number,
        required: true,
    },
    totalInclTax: { // Total (TTC)
        type: Number,
        required: true,
    },
    createdBy: { // The user who created this invoice
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// Pre-save middleware to ensure the invoice number is generated before saving
InvoiceSchema.pre('save', async function (next) {
    if (!this.invoiceNumber) {
        try {
            const lastInvoice = await mongoose
                .model('Invoice')
                .findOne()
                .sort({ createdAt: -1 }); // Get the most recent invoice

            const lastInvoiceNumber = lastInvoice
                ? parseInt(lastInvoice.invoiceNumber.replace('CA', ''), 10)
                : 0;

            // Generate a new invoice number
            this.invoiceNumber = `CA${String(lastInvoiceNumber + 1).padStart(6, '0')}`;
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    }

    // Automatically set issueDate to current date if not provided
    if (!this.issueDate) {
        this.issueDate = new Date();
    }

    next(); // Continue with the save operation
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

export { InvoiceModel };
