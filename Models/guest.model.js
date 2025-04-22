import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, guestNo: {
        type: Number,
        required: true
    },
    pincode:{
        type:String ,
        required:false
    }
});

const Guest_Model = mongoose.model("Guest", guestSchema);
export { Guest_Model }
