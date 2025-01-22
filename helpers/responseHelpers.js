
// Helper function to format success response
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};

// Helper function to format error response
export const errorResponse = (res, message = 'Something went wrong', statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message
    });
};

// Helper function to validate the invoice data
export const validateInvoiceData = (data) => {
    const requiredFields = [
        { name: 'orderRef', type: 'string' },
        { name: 'orderDate', type: 'string' },  
        { name: 'products', type: 'object' },  
        { name: 'carrierName', type: 'string' },
        // { name: 'shippingFees', type: 'string' },
        { name: 'paymentMethod', type: 'string' }
    ];

    // Validate if the required fields exist and match the expected type
    for (let { name, type } of requiredFields) {
        if (!data[name]) {
            return `Missing required field: ${name}`;
        }

        // Validate type of the field
        if (typeof data[name] !== type && !(type === 'object' && data[name] instanceof Date)) {
            return `Invalid type for field ${name}. Expected ${type}, got ${typeof data[name]}.`;
        }

        // // Specific validation for numerical fields (shippingFees, totalProductsExclTax, totalTax, totalInclTax)
        // if (['shippingFees'].includes(name)) {
        //     if (data[name] < 0) {
        //         return `${name} must be a positive number.`;
        //     }
        // }

        // Validate products field (ensure it's an array and contains the necessary fields)
        if (name === 'products') {
            if (!Array.isArray(data[name]) || data[name].length === 0) {
                return 'Products must be a non-empty array.';
            }

            // Validate each product within the products array
            for (let product of data[name]) {
                const productFields = ['reference', 'name', 'unitPriceExclTax', 'quantity'];
                for (let field of productFields) {
                    if (!product[field]) {
                        return `Missing field "${field}" in product.`;
                    }

                    // Ensure correct type for each product field
                    // if (typeof product[field] !== 'number' && field !== 'reference' && field !== 'name') {
                    //     return `Invalid type for "${field}". Expected number, got ${typeof product[field]}.`;
                    // }
                }
            }
        }
    }

    return null;
};



export const calculateInvoiceTotals = (products, shippingFees=0,taxRateOne, taxRateTwo) => {
    let totalProductsExclTax = 0;
    let totalTax = 0;

  
    const productsFinal = products.map(product => {
        
        product.totalExclTax = product.unitPriceExclTax * product.quantity;
        totalProductsExclTax += product.totalExclTax
        return product
    });
    
    totalProductsExclTax = totalProductsExclTax.toFixed(2)
    const totalsExclTax = (Number(totalProductsExclTax) + Number(shippingFees)).toFixed(2)
    totalTax = (totalsExclTax * (taxRateOne/100)) + (totalsExclTax * (taxRateTwo/100))
    totalTax = totalTax.toFixed(2)
    let totalInclTax = Number(totalsExclTax) + Number(totalTax);
    totalInclTax = Number(totalInclTax).toFixed(2)


    return {
        totalProductsExclTax,
        totalTax,
        totalInclTax,
        totalsExclTax,
        productsFinal
    };
};


function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
}