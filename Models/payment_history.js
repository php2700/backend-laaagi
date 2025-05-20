import mongoose from "mongoose";
import { type } from "os";

const paymentHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    invitationName: {
        type: String,
        required: true
    },
    guest: [
        {
            guestId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    boxName: {
        type: String,
        required: true
    },
    invAmounts: {
        type: [String],
        required: true
    },
    invitationImg: {
        type: String,
        required: true
    },
    boxAmount: {
        type: Number,
        required: true
    },
    invDesc: {
        type: String,
        required: true
    },
    sweets: [
        {
            index: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    razorpay_order_id: {
        type: String,
        required: true
    },


}, {
    timestamps: true
});

const Payment_History_Model = mongoose.model("paymentHistory", paymentHistorySchema);
export { Payment_History_Model }
