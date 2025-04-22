import mongoose from "mongoose";

const weddingSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

});

const Wedding_Model = mongoose.model("Wedding", weddingSchema);
export { Wedding_Model }
