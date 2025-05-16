import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    decorationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Decoration",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Quote_model = mongoose.model("quote", quoteSchema)
export default Quote_model;