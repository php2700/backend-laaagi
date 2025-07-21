import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    registerBy: {
        type: String,
        required: true
    },
    addressBy: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'user'
    },
    profile: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    }
}, {
    timestamps: true
}
);

const user_Model = mongoose.model("user", userSchema);
export { user_Model }
