import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
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
    registerBy: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default:'user'
    },
    otp:{
        type:String,
        required:false
    }
});

const user_Model = mongoose.model("user", userSchema);
export { user_Model }
