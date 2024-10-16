import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    contactType: {
        type: String,
        enum: ['private', 'business'],
        required: true
    },
    last_name: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    municipality: {
        type: String,
    },
    province: {
        type: String,
    },
    website: {
        type: String,
    },
    skype: {
        type: String,
    },
    birthday: {
        type: String,
    },
    businessName: {
        type: String,
        required: function() { return this.contactType === 'business'; }
    },
    paymentMethod: {
        type: String,
        required: function() { return this.contactType === 'business'; }
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }


})

const ContactModel = mongoose.model("contacts", ContactSchema)
export {ContactModel}