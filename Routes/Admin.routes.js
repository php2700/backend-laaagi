import express from "express";
import { aboutList, addAbout, addAds, addBestSeller, addDecoration, addDesigner, addDiscoverSweets, addDryFruit, 
    addInvitation,designerQuoteList,addInvitationDesign, addInvitationBox, addPlanning, addReview, addSweets, addWedding, adsList, authAdmin, bestSellerList, contactUsList, customization, customizationList, dashboardData, decorationList, DeleteBanner, deleteBestSeller, DeleteDecoration, deleteDesigner, deleteDryFruit, deleteInvitation, deletePlanning, deleteReview, DeleteSweet, deleteWedding, discoverSweetsList, dryFruitList, getDesignerList, ImageList, invitationBoxList, invitationList, planningList, quoteList, reviewList, sweetsList, updateABout, updateAds, updateBanner, updateDiscoverSweets, updateDryFruit, updateInvitation, updateInvitationBox, updatePlanning, updateReview, updateSweets, updateUser, updateWedding, uploadImage, userList, weddingList, 
    getInvitationQuote} from "../Controllers/Admin.controller.js";
// import {   authAdmin, bestSellerList, contactUsList, customization, customizationList, dashboardData, decorationList, DeleteBanner, deleteBestSeller, DeleteDecoration, deleteDesigner, deleteDryFruit, deleteInvitation, deletePlanning, deleteReview, DeleteSweet, deleteWedding, designerQuoteList, discoverSweetsList, dryFruitList, getDesignerList, ImageList, invitationBoxList, invitationList, planningList, quoteList, reviewList, sweetsList, updateABout, updateAds, updateBanner, updateDiscoverSweets, updateDryFruit, updateInvitation, updateInvitationBox, updatePlanning, updateReview, updateSweets, updateUser, updateWedding, uploadImage, userList, weddingList } from "../Controllers/Admin.controller.js";
import { Authentication } from "../Middlewares/Authentication.middleware.js";
import { Authorization } from "../Middlewares/Authorization.middleware.js";


const AdminRouter = express.Router();

/*  ------ login -------*/
AdminRouter.post("/admin_login", authAdmin);

/*------------ dashboard ---------------*/
AdminRouter.get("/dashboard", Authentication, Authorization(["Admin"]), dashboardData);

/*  --------banner-------*/
AdminRouter.get("/banner_list", Authentication, Authorization(["Admin"]), ImageList);
AdminRouter.patch('/update_banner/', Authentication, Authorization(["Admin"]), updateBanner)
AdminRouter.delete('/delete_banner/:id', Authentication, Authorization(["Admin"]), DeleteBanner)
AdminRouter.post("/add_imageAdmin", Authentication, Authorization(['Admin']), uploadImage)

/* ------sweets---------- */
AdminRouter.delete('/delete_sweets/:id', Authentication, Authorization(["Admin"]), DeleteSweet)
AdminRouter.post("/add_sweets", Authentication, Authorization(["Admin"]), addSweets)
AdminRouter.get("/sweets_list", Authentication, Authorization(["Admin"]), sweetsList)
AdminRouter.patch("/update_sweets", Authentication, Authorization(["Admin"]), updateSweets)

/* ----------decoration----------*/
AdminRouter.delete('/delete_decoration/:id', Authentication, Authorization(["Admin"]), DeleteDecoration)
AdminRouter.post("/add_decoration", Authentication, Authorization(["Admin"]), addDecoration)
AdminRouter.get("/decoration_list", Authentication, Authorization(["Admin"]), decorationList)

/* ----------designers----------*/
AdminRouter.delete("/delete_designer/:id", Authentication, Authorization(["Admin"]), deleteDesigner)
AdminRouter.post("/add_designer", Authentication, Authorization(["Admin"]), addDesigner)
AdminRouter.get('/designers_list', Authentication, Authorization(["Admin"]), getDesignerList);

/* ------------- ads ----------------*/
AdminRouter.post("/add_ads", Authentication, Authorization(["Admin"]), addAds)
AdminRouter.get("/ads_list", Authentication, Authorization(["Admin"]), adsList)
AdminRouter.patch("/update_ads", Authentication, Authorization(["Admin"]), updateAds)

/* ------------- about ------------------*/
AdminRouter.post("/about", Authentication, Authorization(["Admin"]), addAbout)
AdminRouter.get("/about_list", Authentication, Authorization(["Admin"]), aboutList)
AdminRouter.patch("/update_about", Authentication, Authorization(["Admin"]), updateABout)


/* --------------- review ---------------- */
AdminRouter.post("/add_review", Authentication, Authorization(["Admin"]), addReview)
AdminRouter.patch("/update_review", Authentication, Authorization(["Admin"]), updateReview)
AdminRouter.get("/review_list", Authentication, Authorization(["Admin"]), reviewList)
AdminRouter.delete("/delete_review/:id", Authentication, Authorization(["Admin"]), deleteReview)


/* --------------------- inviation -------------- */
AdminRouter.post("/add_invitation", Authentication, Authorization(["Admin"]), addInvitation)
AdminRouter.delete("/invitation_delete/:id", Authentication, Authorization(["Admin"]), deleteInvitation)
AdminRouter.patch("/update_invitation", Authentication, Authorization(["Admin"]), updateInvitation)
AdminRouter.get("/invitation_list", Authentication, Authorization(["Admin"]), invitationList)

/* ------------------------- contact details -----------------------*/
AdminRouter.get("/contact_us", Authentication, Authorization(["Admin"]), contactUsList)

/*--------------------invitaation-quote --------*/
AdminRouter.get("/invitation-quote-list", Authentication, Authorization(["Admin"]), getInvitationQuote);


/*------------------------------ wedding -----------------*/
AdminRouter.post("/add_wedding", Authentication, Authorization(["Admin"]), addWedding)
AdminRouter.patch("/update_wedding", Authentication, Authorization(["Admin"]), updateWedding)
AdminRouter.get("/wedding_list", Authentication, Authorization(["Admin"]), weddingList)
AdminRouter.delete("/delete_wedding/:id", Authentication, Authorization(["Admin"]), deleteWedding)

/* ----------------------------- dry fruit -------------*/
AdminRouter.post("/add_dry_fruit", Authentication, Authorization(["Admin"]), addDryFruit)
AdminRouter.patch("/update_dry_fruit", Authentication, Authorization(["Admin"]), updateDryFruit)
AdminRouter.get("/dry_fruit_list", Authentication, Authorization(["Admin"]), dryFruitList)
AdminRouter.delete("/delete_dry_fruit/:id", Authentication, Authorization(["Admin"]), deleteDryFruit)

/* -----------------------------best seller -------------*/
AdminRouter.post("/add_best_seller", Authentication, Authorization(["Admin"]), addBestSeller)
AdminRouter.get("/best_seller_list", Authentication, Authorization(["Admin"]), bestSellerList)
AdminRouter.delete("/delete_best_seller/:id", Authentication, Authorization(["Admin"]), deleteBestSeller)


/*------------------------- planning  -------------------*/
AdminRouter.post("/add_planning", Authentication, Authorization(["Admin"]), addPlanning)
AdminRouter.patch("/update_planning", Authentication, Authorization(["Admin"]), updatePlanning)
AdminRouter.get("/planning_list", Authentication, Authorization(["Admin"]), planningList)
AdminRouter.delete("/delete_planning/:id", Authentication, Authorization(["Admin"]), deletePlanning);

/*------------------------ invitation box-------------------*/
AdminRouter.post("/add_invitation_box", Authentication, Authorization(["Admin"]), addInvitationBox)
AdminRouter.patch("/update_invitation_box", Authentication, Authorization(["Admin"]), updateInvitationBox)
AdminRouter.get("/invitation_box_list", Authentication, Authorization(["Admin"]), invitationBoxList)

/*--------------------- discover sweets ------------------*/
AdminRouter.post("/add_discover_sweets", Authentication, Authorization(["Admin"]), addDiscoverSweets)
AdminRouter.patch("/update_discover_sweets", Authentication, Authorization(["Admin"]), updateDiscoverSweets)
AdminRouter.get("/discover_sweets_list", Authentication, Authorization(["Admin"]), discoverSweetsList)


/*----------------------- user -------------------------*/
AdminRouter.patch("/edit-user", Authentication, Authorization(["Admin"]), updateUser)
AdminRouter.get("/user-list", Authentication, Authorization(["Admin"]), userList)

/*------------------- customization ---------------*/
AdminRouter.post("/customization", Authentication, Authorization(["Admin"]), customization)
AdminRouter.get("/customization-list", Authentication, Authorization(["Admin"]), customizationList)

/*----------------------- quote --------------*/
AdminRouter.get("/quote-list", Authentication, Authorization(["Admin"]), quoteList)
AdminRouter.post('/add_invitation', addInvitationDesign);


/*-----------------------designer quote --------------*/
AdminRouter.get("/designer-quote-list", Authentication, Authorization(["Admin"]), designerQuoteList)


export default AdminRouter;