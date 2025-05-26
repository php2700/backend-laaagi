import mongoose from "mongoose";

const itemHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    sweet: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Sweet_History_Model = mongoose.model("itemPaymentHistory", itemHistorySchema);
export { Sweet_History_Model }
