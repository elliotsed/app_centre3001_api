import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    contactType: {
        type: String,
        enum: ['private', 'business'],
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { email: { $type: "string", $ne: "" } }
        }
    },
    phone: {
        type: String,
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
    comment: {
        type: String,
    },
    businessName: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }


})

const ContactModel = mongoose.model("contacts", ContactSchema)
export { ContactModel }