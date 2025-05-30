import mongoose from "mongoose";

const dryFruitSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

const Dry_fruit_Model = mongoose.model("DryFruit", dryFruitSchema);
export { Dry_fruit_Model }
