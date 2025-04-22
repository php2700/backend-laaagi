import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Contact_us_model = mongoose.model("contact", contactSchema)
export default Contact_us_model;