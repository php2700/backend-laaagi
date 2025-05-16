import mongoose from "mongoose";
import { type } from "os";

const invitationSchema = new mongoose.Schema({
    image: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

const Invitation_Model = mongoose.model("invitation", invitationSchema);
export { Invitation_Model }
