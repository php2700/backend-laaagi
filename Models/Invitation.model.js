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
    price:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Invitation_Model = mongoose.model("invitation", invitationSchema);
export { Invitation_Model }
