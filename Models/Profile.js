// // models/Profile.js
// const mongoose = require('mongoose');

// const ProfileSchema = new mongoose.Schema({
//     // In a real app, you'd link this to a User model via mongoose.Schema.Types.ObjectId
//     // userId: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: 'User', // Reference to a User model (if you have one)
//     //   required: true,
//     //   unique: true
//     // },
//     name: {
//         type: String,
//         trim: true, // Removes whitespace
//         default: '', // Default to empty string if not provided
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         // unique: true, // Be careful with unique constraint on updates if email isn't the primary identifier
//         default: '',
//     },
//     mobile: {
//         type: String,
//         trim: true,
//         default: '',
//     },
//     location: {
//         type: String,
//         trim: true,
//         default: '',
//     },
//     bio: {
//         type: String,
//         trim: true,
//         default: '',
//     },
//     avatarUrl: { // Store path/URL to avatar image
//         type: String,
//         default: null, // Or a path to a default server-side avatar
//     },
//     // Timestamps add createdAt and updatedAt fields automatically
// }, { timestamps: true });

// // Create the model. Mongoose will create a collection named 'profiles' (lowercase, pluralized)
// module.exports = mongoose.model('Profile', ProfileSchema);