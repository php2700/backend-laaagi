import mongoose from "mongoose";

const recentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fruitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    },
    isSweet: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

const Recent_View_model = mongoose.model("recentView", recentSchema)
export default Recent_View_model;