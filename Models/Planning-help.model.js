import mongoose from "mongoose";

const HelpReqSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    planningId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'planning'
    }
}, {
    timestamps: true
}
);

const Planning_Help_Req_Model = mongoose.model("planningHelpReq", HelpReqSchema);
export { Planning_Help_Req_Model }
