import mongoose from "mongoose";

const sweetsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sweetscolomn: {
        type: Boolean,
        required: false
    },
});

const Sweets_Model = mongoose.model("Sweets", sweetsSchema);
export { Sweets_Model }
