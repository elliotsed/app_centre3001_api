import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
    },
    issueDate: { 
        type: Date,
        required: true,
        default: Date.now, 
    },
    orderRef: { 
        type: String,
    },
    orderDate: { 
        type: Date,
    },
    deliveryAddress: { 
        name: { type: String, required: true },
        doorNumberStreet: { type: String, required: true },
        provinceCountry: { type: String, required: true },
        municipalityPostalCode: { type: String, required: true },
        extraInfo: { type: String },
        telephone: { type: Number, required: true },
    },
    billingAddress: {
        name: { type: String, required: true },
        doorNumberStreet: { type: String, required: true },
        provinceCountry: { type: String, required: true },
        municipalityPostalCode: { type: String, required: true },
        extraInfo: { type: String },
        telephone: { type: Number, required: true },
    },
    products: [
        {
            reference: { 
                type: String,
                required: true,
            },
            name: { 
                type: String,
                required: true,
            },
            taxRateOne: { 
                type: Number,
                required: true,
            },
            taxRateTwo: { 
                type: Number,
                required: true,
            },
            unitPriceExclTax: { // Prix unitair
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
    shippingFees: { 
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
    },// Taux de taxe
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

InvoiceSchema.pre('save', async function (next) {
    if (!this.invoiceNumber) {
        try {
            const lastInvoice = await mongoose
                .model('Invoice')
                .findOne()
                .sort({ createdAt: -1 }); 

            const lastInvoiceNumber = lastInvoice
                ? parseInt(lastInvoice.invoiceNumber.replace('CA', ''), 10)
                : 4999; 

            // Generate a new invoice number
            this.invoiceNumber = `CA${String(lastInvoiceNumber + 1).padStart(6, '0')}`;
        } catch (error) {
            return next(new Error(`Error generating invoice number: ${error.message}`));
        }
    }

    if (!this.issueDate) {
        this.issueDate = new Date();
    }

    next(); // Continue with the save operation
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);

export { InvoiceModel };
