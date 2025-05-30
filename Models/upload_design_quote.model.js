import mongoose from "mongoose";

const uploadDesignQuoteSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

export const upload_design_quote_model = mongoose.model("upload_design_quote", uploadDesignQuoteSchema);
// export { upload_design_quote_model }
