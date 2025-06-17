import mongoose from "mongoose";

const PrivacyPolicySchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const PrivacyPolicyModel = mongoose.model("privacyPolicy", PrivacyPolicySchema);
export { PrivacyPolicyModel }
