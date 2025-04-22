import mongoose from "mongoose";

const dryFruitSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

});

const Dry_fruit_Model = mongoose.model("DryFruit", dryFruitSchema);
export { Dry_fruit_Model }
