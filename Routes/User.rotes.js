// 
import express from "express";
import { addContactDetails, AddGuest, createCustomizationRequest, deleteGuest, editGuest, getPaymentHistory, getPaymentView, getSweetHistory, guestData, guestList, updateAddressPerson } from "../Controllers/UserController.js";
import { addContactUsDetail, AddDesignerQuote, addInvitationBox, AddQuote, bannerList, createUser, dryFruitById, loginByGoogle, sweetById, updateAddress, userAboutList, userAddPlanningHistory, userAdsList, userBestSellerList, userDataById, userDecorationList, userDesigner, userDiscoverSweetsList, userDryFruits, userInvitationBoxList, userInvitationById, userInvitationList, userplanningList, userReviewList, userSweetsList, userWeddingList, verifyOtp } from "../Controllers/Admin.controller.js";
import { Authentication } from "../Middlewares/Authentication.middleware.js";
import { Authorization } from "../Middlewares/Authorization.middleware.js";
import { Protect } from "../Middlewares/authMiddleware.js";
import { getUserProfile, updateUserProfile } from "../Controllers/UserProfile.controller.js";
const UserRouter = express.Router();

// const {upload }= require('../Middleware/upload.js');
// import multer from 'multer';
// import path from 'path';    

UserRouter.get("/profile", Protect, getUserProfile);
UserRouter.put("/profile", Protect, updateUserProfile);


UserRouter.post("/add_contact", addContactDetails);

/*-------------------- banner --------------*/
UserRouter.get("/banner_list", bannerList);

/*------------------- wedding special -----------*/
UserRouter.get("/wedding_list", userWeddingList);

/*---------------- dry fruit -----------------*/
UserRouter.get("/dry_fruit/:id", dryFruitById);
UserRouter.get("/dry_fruit_list", userDryFruits);

/*------------------ best seller----------------*/
UserRouter.get("/best_seller_list", userBestSellerList);

/*------------------discover sweets ----------------*/
UserRouter.get("/discover_sweets_list", userDiscoverSweetsList);

/*-------------------------invitation boxes -------------*/
UserRouter.get("/invitation_box_list", userInvitationBoxList);

/*------------------------ads------------------*/
UserRouter.get("/ads_list", userAdsList);

/*----------------------about ----------------*/
UserRouter.get("/about_list", userAboutList);

/*--------------------revie -----------------*/
UserRouter.get("/review_list", userReviewList);

/*---------------------sweets ------*/
UserRouter.get("/sweet/:id", sweetById);
UserRouter.get("/sweets_list", userSweetsList);

/*---------------decorations -----------*/
UserRouter.get("/decoration_list", userDecorationList);

/*---------------designer ----------*/
UserRouter.get('/designers_list', userDesigner);

/*---------------invitations ----------*/

UserRouter.post("/add_invitation", addInvitationBox);
UserRouter.get("/invitation/:id", userInvitationById);
UserRouter.get("/invitation_list", userInvitationList);

/*---------------contact-us---------------*/
UserRouter.post("/contact-us-detail", addContactUsDetail);

/*----------------quote ----------------*/
UserRouter.post('/quote', AddQuote);

/*----------------add-designerQuote ----------------*/
UserRouter.post('/designer-quote', AddDesignerQuote);

/*--------------user----------*/
UserRouter.post('/register', createUser)
UserRouter.post('/google-login', loginByGoogle)
UserRouter.post("/verify-otp", verifyOtp)
UserRouter.patch("/update", Authentication, Authorization(['user']), updateAddress)
UserRouter.get('/data/:id', Authentication, Authorization(['user']), userDataById)


/*----------------planning ------------*/
UserRouter.get("/planning_list/:userId", Authentication, Authorization(['user']), userplanningList);
UserRouter.post("/add-planning-history", Authentication, Authorization(['user']), userAddPlanningHistory);

/*------------------- guest -----------------*/
UserRouter.post("/add-guest", Authentication, Authorization(['user']), AddGuest);
UserRouter.get("/guest-list/:userId", Authentication, Authorization(['user']), guestList);
UserRouter.get("/guest-data/:id", Authentication, Authorization(['user']), guestData);
UserRouter.delete("/delete-guest/:id", Authentication, Authorization(['user']), deleteGuest);
UserRouter.patch("/edit-guest", Authentication, Authorization(['user']), editGuest);
UserRouter.patch("/update-address-person", updateAddressPerson)


UserRouter.post('/customization-requests', createCustomizationRequest);


/*------------------------payment history --------------------------*/
UserRouter.get("/sweet-history/:id", Authentication, Authorization(['user']), getSweetHistory)
UserRouter.get("/payment-data/:id", Authentication, Authorization(['user']), getPaymentView);
UserRouter.get("/payment-history/:userId", Authentication, Authorization(['user']), getPaymentHistory);




export default UserRouter;
