import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const planningHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    planningId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'planning'
    },
    checked: {
        type: [Number],
        required: true
    },
}, {
    timestamps: true
}
);

const Planning_History_Model = mongoose.model("planningHistory", planningHistorySchema);
export { Planning_History_Model }
