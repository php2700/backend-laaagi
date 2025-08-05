import mongoose from "mongoose";

const cartSweetSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    index: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    sweetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
                ref:"Sweets"
    },
    img: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});

const Cart_Sweet_model = mongoose.model('cartSweet', cartSweetSchema);
export { Cart_Sweet_model }