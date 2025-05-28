import mongoose from "mongoose";

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
    isBestSeller: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //   designFileUrl: {
    //     type: String,
    //     required: true
    // },
    // amount: {
    //     type: String,
    //     required: true
    // },
    //   updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    //  imagePreviewUrl: { 
    //     type: String,
    //     required: false 
    // },
}, {
    timestamps: true
});

const Invitation_Model = mongoose.model("invitation", invitationSchema);
export { Invitation_Model }
