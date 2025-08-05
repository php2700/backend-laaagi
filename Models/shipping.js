import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const ShippingModel = mongoose.model("shipping", shippingSchema);
export { ShippingModel }
