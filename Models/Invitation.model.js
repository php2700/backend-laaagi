import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    image02: {
        type: String,
        required: true,
    },
    image03: {
        type: String,
        required: true,
    },
    image04: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isInvitationBoxes: {
        type: Boolean,
        required: false,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    isDeliveryCharge: {
        type: Boolean,
        default: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    videoFile: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const Invitation_Model = mongoose.model("invitation", invitationSchema);
export { Invitation_Model }
