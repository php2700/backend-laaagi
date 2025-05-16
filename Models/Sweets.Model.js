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
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isWedding: {
        type: Boolean,
        required: false,
        default: false
    },
    isSweet: {
        type: Boolean,
        required: false,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

const Sweets_Model = mongoose.model("Sweets", sweetsSchema);
export { Sweets_Model }
