import mongoose from "mongoose";

const paymentRefundSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const PaymentRefundModel = mongoose.model("paymentRefund", paymentRefundSchema);
export { PaymentRefundModel }
