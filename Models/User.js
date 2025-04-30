// const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs'); // Agar password hashing use kar rahe hain

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please add a name']
//     },
//     email: {
//         type: String,
//         required: [true, 'Please add an email'],
//         unique: true,
//         match: [ // Basic email format validation
//             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//             'Please add a valid email'
//         ]
//     },
//     // Password ko profile update mein directly nahi badalna chahiye,
//     // iske liye alag endpoint/logic hona chahiye.
//     password: {
//          type: String,
//          required: [true, 'Please add a password'],
//          minlength: 6,
//          select: false // Password ko by default queries se fetch na karein
//     },
//     mobile: {
//         type: String,
//         // Add validation if needed (e.g., length, format)
//     },
//     location: {
//         type: String,
//     },
//     bio: {
//         type: String,
//         maxlength: [500, 'Bio cannot be more than 500 characters']
//     },
//     avatarUrl: {
//         type: String,
//         default: '/path/to/default/avatar.png' // Default avatar set karein
//     },
//     memberSince: { // React component mein tha, add kar sakte hain
//         type: Date,
//         default: Date.now
//     }
//     // Add other fields as needed (e.g., role, resetPasswordToken, etc.)
// }, {
//     timestamps: true // createdAt aur updatedAt fields automatically add karega
// });

// // Optional: Password Hashing Middleware (agar user create/register karte waqt hash karna hai)
// // userSchema.pre('save', async function(next) {
// //    if (!this.isModified('password')) {
// //        next();
// //    }
// //    const salt = await bcrypt.genSalt(10);
// //    this.password = await bcrypt.hash(this.password, salt);
// // });

// module.exports = mongoose.model('User', userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  location: String,
  bio: String,
  avatarUrl: String,
  password: String,
}, { timestamps: true });

 const User = mongoose.model("User", userSchema);

export default User;
