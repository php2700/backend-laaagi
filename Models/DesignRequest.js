// // // server/models/DesignRequest.js
// // const mongoose = require('mongoose');

// // const DesignRequestSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: [true, 'Name is required'],
// //         trim: true,
// //     },
// //     email: {
// //         type: String,
// //         required: [true, 'Email is required'],
// //         trim: true,
// //         lowercase: true,
// //         match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
// //     },
// //     phone: {
// //         type: String,
// //         required: [true, 'Phone number is required'],
// //         trim: true,
// //     },
// //     quantity: {
// //         type: Number,
// //         min: [1, 'Quantity must be at least 1'],
// //     },
// //     notes: {
// //         type: String,
// //         trim: true,
// //     },
// //     designFilePath: {
// //         type: String,
// //         required: [true, 'Design file path is required'],
// //     },
// //     designFileOriginalName: {
// //         type: String,
// //         required: [true, 'Original file name is required'],
// //     },
// //     submittedAt: {
// //         type: Date,
// //         default: Date.now,
// //     },
// // });

// // module.exports = mongoose.model('DesignRequest', DesignRequestSchema);
// // server/models/DesignRequest.js
// // import mongoose from 'mongoose'; // 'require' को 'import' से बदलें

// // const DesignRequestSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: [true, 'Name is required'],
// //         trim: true,
// //     },
// //     email: {
// //         type: String,
// //         required: [true, 'Email is required'],
// //         trim: true,
// //         lowercase: true,
// //         match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
// //     },
// //     phone: {
// //         type: String,
// //         required: [true, 'Phone number is required'],
// //         trim: true,
// //     },
// //     quantity: {
// //         type: Number,
// //         min: [1, 'Quantity must be at least 1'],
// //     },
// //     notes: {
// //         type: String,
// //         trim: true,
// //     },
// //     designFilePath: {
// //         type: String,
// //         required: [true, 'Design file path is required'],
// //     },
// //     designFileOriginalName: { // मैंने इसे designFileOriginalName से designFileOriginalName में बदल दिया, मान लिया यह टाइपो था
// //         type: String,
// //         required: [true, 'Original file name is required'],
// //     },
// //     submittedAt: {
// //         type: Date,
// //         default: Date.now,
// //     },
   
// // });



// // export const DesignRequestModel = mongoose.model('DesignRequest', DesignRequestSchema);

// // new
// import mongoose from 'mongoose';

// const designFormSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     quantity: { type: Number },
//     notes: { type: String },
//     designFileUrl: { type: String, required: true },
// }, { timestamps: true });

// const DesignRequest = mongoose.model('Design', designFormSchema);

// // Default export
// export { DesignRequest}

// 16
import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
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
    price:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
      designFileUrl: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
});

const Design_Model = mongoose.model("Design", DesignSchema);
export { Design_Model }
