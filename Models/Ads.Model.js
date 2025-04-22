import mongoose from "mongoose";

const adsSchema=new mongoose.Schema({
    banner:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required: true,
    }
});

const Ads_Model = mongoose.model("Ads", adsSchema);
export {Ads_Model}
