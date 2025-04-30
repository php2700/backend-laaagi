// // const User = require('../Models/User.js'); // ✅ Adjusted path to go up if needed
// // const UserModel = require('../Models/User.js');

// // // User model ko access karne ke liye

// // const Protect = async (req, res, next) => {
// //     console.log('Auth Middleware Triggered');

// //     let userId;

// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //         // JWT verify ka actual logic yahan aayega
// //         console.warn('Auth Middleware: JWT verification logic needed!');

// //         try {
// //             // DB se pehla user uthao testing ke liye
// //             const testUser = await User.findOne().select('_id');
// //             if (testUser) {
// //                 userId = testUser._id;
// //                 console.log(`Auth Middleware: Using test user ID: ${userId}`);
// //             } else {
// //                 console.error('Auth Middleware: No users found in DB for testing!');
// //                 return res.status(401).json({ message: 'Not authorized, no test user found' });
// //             }
// //         } catch (error) {
// //             console.error('Auth Middleware: Error finding test user:', error);
// //             return res.status(500).json({ message: 'Server error during auth test setup' });
// //         }
// //     } else {
// //         console.warn('Auth Middleware: No Bearer token found in Authorization header.');
// //         return res.status(401).json({ message: 'Not authorized, no token' });
// //     }

// //     if (!userId) {
// //         return res.status(401).json({ message: 'Not authorized' });
// //     }

// //     try {
// //         req.user = await User.findById(userId).select('-password');

// //         if (!req.user) {
// //             return res.status(401).json({ message: 'Not authorized, user not found' });
// //         }

// //         console.log(`Auth Middleware: User ${req.user.email} attached to request.`);
// //         next();
// //     } catch (error) {
// //         console.error('Error in auth middleware:', error);
// //         res.status(401).json({ message: 'Not authorized, token failed' });
// //     }
// // };

// // // ✅ Correct export for CommonJS
// // module.exports = { Protect };
// import  User  from "../Models/User.js";
//  // ESM import

// export const Protect = async (req, res, next) => {
//     console.log('Auth Middleware Triggered');
//     let userId;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         console.warn('Auth Middleware: JWT verification logic needed!');

//         try {
//             const testUser = await User.findOne().select('_id');
//             if (testUser) {
//                 userId = testUser._id;
//                 console.log(`Auth Middleware: Using test user ID: ${userId}`);
//             } else {
//                 return res.status(401).json({ message: 'Not authorized, no test user found' });
//             }
//         } catch (error) {
//             return res.status(500).json({ message: 'Server error during auth test setup' });
//         }
//     } else {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     if (!userId) {
//         return res.status(401).json({ message: 'Not authorized' });
//     }

//     try {
//         req.user = await User.findById(userId).select('-password');

//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authorized, user not found' });
//         }

//         console.log(`Auth Middleware: User ${req.user.email} attached to request.`);
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Not authorized, token failed' });
//     }
// };
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const Protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ message: "User not found" });
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token verification failed" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
