import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    invitationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "invitation",
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Customization_model = mongoose.model("customization", customizationSchema)
export default Customization_model;