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
    razorpay_payment_id: {
        type: String,
        required: true
    },
    invitationName:{
         type: String,
        required: true
    },
    sweet: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Payment_History_Model = mongoose.model("paymentHistory", paymentHistorySchema);
export { Payment_History_Model }
