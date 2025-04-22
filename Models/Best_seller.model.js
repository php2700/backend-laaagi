import mongoose from "mongoose";

const bestSellerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

});

const Best_seller_Model = mongoose.model("BestSeller", bestSellerSchema);
export { Best_seller_Model }
