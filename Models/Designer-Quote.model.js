import mongoose from "mongoose";

const designerQuoteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    designerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designer",
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    }, 
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Designer_Quote_model = mongoose.model("designer-quote", designerQuoteSchema)
export default Designer_Quote_model;