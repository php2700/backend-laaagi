import mongoose from "mongoose";

const sweetsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    layoutColumns: { 
        type: Number,    
        required: false,  
        default: 1,      
        min: 1,           
        max: 2          
    },
});

const Sweets_Model = mongoose.model("Sweets", sweetsSchema);
export { Sweets_Model }
