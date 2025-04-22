import mongoose from "mongoose";

const invitationBoxSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },

});

const Invitation_Box_Model = mongoose.model("initationBox", invitationBoxSchema);
export { Invitation_Box_Model }
