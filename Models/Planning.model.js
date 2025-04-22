import mongoose from "mongoose";

const planningSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PlanningModel = mongoose.model("planning", planningSchema);
export { PlanningModel }
