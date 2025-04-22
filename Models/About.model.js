import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true
    }
});

const About_model=mongoose.model("about",aboutSchema);
export { About_model}