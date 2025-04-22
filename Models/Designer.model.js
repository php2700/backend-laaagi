import mongoose from "mongoose";

const designerSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Designer_Model = mongoose.model("Designer", designerSchema);
export { Designer_Model }
