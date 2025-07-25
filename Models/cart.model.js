import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    invitationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "invitation"
    },
    weight: {
        type: String,
        required: true,
    },
    boxName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tempId: {
        type: Number,
        required: true
    },
    sectionBoxName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Cart_model = mongoose.model('cart', cartSchema);
export { Cart_model }