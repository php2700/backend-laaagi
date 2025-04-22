import mongoose from "mongoose";
import { type } from "os";

const planningHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    planningId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    checked: {
        type: [Number],
        required: true
    },
});

const Planning_History_Model = mongoose.model("planningHistory", planningHistorySchema);
export { Planning_History_Model }
