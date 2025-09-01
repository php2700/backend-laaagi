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
        required: false
    },
    email: {
        type: String,
        required: false
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
        required: false
    },
    pincode:{
        type:String ,
        required:false
    }
});

const Guest_Model = mongoose.model("Guest", guestSchema);
export { Guest_Model }
