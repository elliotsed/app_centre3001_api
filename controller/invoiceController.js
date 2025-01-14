import express from 'express';
import { InvoiceModel } from '../models/Invoice.js';
import { errorResponse, successResponse, validateInvoiceData, calculateInvoiceTotals } from '../helpers/responseHelpers.js';

const createInvoice = async (req, res) => {
    let {
        orderRef, orderDate,
        products, carrierName, shippingFees, paymentMethod, deliveryAddress, billingAddress
    } = req.body;

    // Validate input
    const validationError = validateInvoiceData(req.body);
    if (validationError) {
        return errorResponse(res, validationError, 400);
    }

    try {

        const { totalProductsExclTax, totalTax, totalInclTax, productsFinal } = calculateInvoiceTotals(products,shippingFees);

        products = productsFinal
        console.log("vocii")
        const newInvoice = new InvoiceModel({
            orderRef,
            orderDate,
            products,
            carrierName,
            shippingFees,
            deliveryAddress,
            billingAddress,
            paymentMethod,
            totalProductsExclTax,
            totalTax,
            totalInclTax,
            createdBy: req.user._id,
        });

        // Save the invoice to the database
        const result = await newInvoice.save();
        return successResponse(res, result, 'Invoice created successfully', 201);
    } catch (err) {
        console.log(err);
        return errorResponse(res, err.message, 500);
    }
};

const getInvoices = async (req, res) => {

    try {
        const invoices = await InvoiceModel.find({ createdBy: req.user._id });
        return successResponse(res, invoices, 'Invoices retrieved successfully');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

const getInvoice = async (req, res) => {

    const { id } = req.params;
    if (!id) {
        return errorResponse(res, 'No ID specified', 400);
    }

    try {
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) {
            return errorResponse(res, 'Invoice not found', 404);
        }
        return successResponse(res, invoice, 'Invoice retrieved successfully');
    } catch (err) {

        return errorResponse(res, err.message);
    }
};

const updateInvoice = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return errorResponse(res, 'No ID specified', 400);
    }
    let {
        orderRef, orderDate,
        products, carrierName, shippingFees, paymentMethod, deliveryAddress,billingAddress
    } = req.body;

    const validationError = validateInvoiceData(req.body);

    if (validationError) {
        return errorResponse(res, validationError, 400);
    }

    const { totalProductsExclTax, totalTax, totalInclTax, productsFinal } = calculateInvoiceTotals(products,shippingFees);

    products = productsFinal

    try {
        const result = await InvoiceModel.findByIdAndUpdate(id, {
            orderRef,
            orderDate,
            products,
            carrierName,
            shippingFees,
            deliveryAddress,
            billingAddress,
            paymentMethod,
            totalProductsExclTax,
            totalTax,
            totalInclTax,
            createdBy: req.user._id,
        }, { new: true });
        if (!result) {
            return errorResponse(res, 'Invoice not found', 404);
        }
        return successResponse(res, result, 'Invoice updated successfully');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

const deleteInvoice = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return errorResponse(res, 'No ID specified', 400);
    }

    try {
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) {
            return errorResponse(res, 'Invoice not found', 404);
        }

        await InvoiceModel.findByIdAndDelete(id);
        const invoices = await InvoiceModel.find({ createdBy: req.user._id });

        return successResponse(res, invoices, 'Invoice deleted successfully');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

export { createInvoice, getInvoices, getInvoice, updateInvoice, deleteInvoice };
