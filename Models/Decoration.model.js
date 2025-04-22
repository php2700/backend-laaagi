import mongoose from "mongoose";

const decorationSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
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

const Decoration_Model = mongoose.model("Decoration", decorationSchema);
export { Decoration_Model }
