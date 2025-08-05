import mongoose from "mongoose";

const termAndConditionSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const TermAndConditionModel = mongoose.model("termAndCondtion", termAndConditionSchema);
export { TermAndConditionModel }
