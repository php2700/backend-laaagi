import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Banner_Model = mongoose.model("Banner", bannerSchema);
export {Banner_Model}
