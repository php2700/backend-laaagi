import mongoose from "mongoose";

const discoverSweetSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

});

const discover_sweets_Model = mongoose.model("discoverSweet", discoverSweetSchema);
export { discover_sweets_Model }
