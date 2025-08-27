import { Admin_Model } from "../Models/Admin.model.js";
import jwt from 'jsonwebtoken'
// import { ads, banner, bestSeller, decoration, designer, discoverSweets, dryFruit, inviation, invitationBox, profile, review, sweets, wedding } from "../Config/imageupload.js";

import { ads, banner, bestSeller, decoration, designer, discoverSweets, dryFruit, inviation, invitationBox, review, sweets, uploadImg, uploadQuote, wedding } from "../Config/imageupload.js";

import { Video } from "../Config/videoupload.js"
import { Banner_Model } from "../Models/Banner.model.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import { Sweets_Model } from "../Models/Sweets.Model.js";
import { Decoration_Model } from "../Models/Decoration.model.js";
import { Designer_Model } from "../Models/Designer.model.js";
import { Ads_Model } from "../Models/Ads.Model.js";
import { About_model } from "../Models/About.model.js";
import { Review_Model } from "../Models/Review.model.js";
import { Invitation_Model } from "../Models/Invitation.model.js";
import Contact_model from "../Models/Contact_us.model.js";
import { Wedding_Model } from "../Models/Wedding.model.js";
import { Dry_fruit_Model } from "../Models/Dry_fruit.model.js";
import path from "path";
import fs from 'fs';
import { Best_seller_Model } from "../Models/Best_seller.model.js";
import { PlanningModel } from "../Models/Planning.model.js";
import { Invitation_Box_Model } from "../Models/Invitation_box.model.js";
import { discover_sweets_Model } from "../Models/Discover_sweet.model.js";
import { user_Model } from "../Models/User.model.js";
import Customization_model from "../Models/Customization.model.js";
import Quote_model from "../Models/Quote.model.js";
import { OAuth2Client } from 'google-auth-library';
import { Planning_History_Model } from "../Models/planning_history.model.js";
import mongoose from "mongoose";
import { error } from "console";

import Designer_Quote_model from "../Models/Designer-Quote.model.js";
import { response } from "express";
import { Sweet_History_Model } from "../Models/item-history.model.js";
import { singleItemPaymentHistory } from "./UserController.js";
import { upload_design_quote_model } from "../Models/upload_design_quote.model.js";
import { Planning_Help_Req_Model } from "../Models/Planning-help.model.js";
import { PrivacyPolicyModel } from "../Models/privacy-policy.model.js";
import { TermAndConditionModel } from "../Models/term_condition.js";
import { ShippingModel } from "../Models/shipping.js";
import { PaymentRefundModel } from "../Models/payment_refund.js";
import { Guest_Model } from "../Models/guest.model.js";
import { Payment_History_Model } from "../Models/payment_history.js";




dotenv.config();
const client = new OAuth2Client();
const baseURL = process.env.BASE_URL;



export const authAdmin = async (req, res) => {
    const { email, password } = req.body;
    // const hshpa=await bcrypt.hash(password, 10);
    // console.log(hshpa,"1111111111")
    const userdata = await Admin_Model.findOne({ email: email });
    if (!userdata) {
        return res.status(400).json({
            message: "Admin Not Found",
            status: false,
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, userdata?.password);

    if (!isPasswordMatch) {
        res.status(400).json({
            message: "Invalid Password ",
            status: false,
        });
        return;
    }

    const token = jwt.sign({ _id: userdata._id, role: userdata.role }, process.env.JSON_SECRET, { expiresIn: "7d" });
    // res.setHeader(
    //     "Set-Cookie",
    //     cookie.serialize("Admintoken", token, {
    //         httpOnly: false,
    //         expires: new Date(Date.now() + 60 * 60 * 24 * 10 * 1000),
    //         path: "/",
    //     })
    // );
    return res.json({
        userdata,
        token,
        status: true,
    });

}

export const uploadImage = async (req, res) => {
    banner.single("banner")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { link } = req?.body;
        const newBanner = new Banner_Model({
            banner: "banner/" + req.file?.filename,
            link
        });
        await newBanner.save();
        return res.json({ filename: "banner/" + req.file?.filename });
    });
}


export const dashboardData = async (req, res) => {
    try {
        let dashboardData = {};
        const user = await user_Model.countDocuments();
        const invitation = await Invitation_Model.countDocuments();
        const decoration = await Decoration_Model.countDocuments();
        const designer = await Designer_Model.countDocuments();
        const sweet = await Sweets_Model.countDocuments();
        const review = await Review_Model.countDocuments();
        dashboardData['users'] = user;
        dashboardData['invitations'] = invitation;
        dashboardData['decorations'] = decoration;
        dashboardData['designers'] = designer;
        dashboardData['sweets'] = sweet;
        dashboardData['reviews'] = review;

        return res.status(200).json({
            dashboard: dashboardData,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching dashboard Data",
            error: error.message
        });
    }
}

export const ImageList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const images = await Banner_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Banner_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedUsers = images.map((image) => {
            i++;
            return {
                ...image.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedUsers,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedUsers.length,
            total: totalCount,
        };

        return res.status(200).json({
            Images: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching images:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching images",
            error: error.message
        });
    }
}


export const updateBanner = async (req, res) => {
    await banner.single("banner")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, link } = req.body;

        const existBanner = await Banner_Model.findById(_id);
        if (!existBanner) {
            return res.status(404).json({ error: "banner not found" });
        }
        let updated = {}
        if (req?.file) {
            const previousImagePath = path.join("uploads", existBanner?.banner);
            if (existBanner?.banner && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updated.banner = "banner/" + req.file?.filename
        }
        updated.link = link;
        await Banner_Model.findByIdAndUpdate(_id,
            updated
        )
        return res.json({ message: "data_updated" });
    });
}

export const DeleteBanner = async (req, res) => {
    const { id } = req?.params;
    try {
        await Banner_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'image delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "banner id not found",
            error: error.message
        });
    }
}


export const addSweets = async (req, res) => {
    sweets.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name, amount, category, description } = req.body;

        if (!name || !amount || !category || !description) {
            return res.status(400).json({ error: "Name,amount,description and category are required." });
        }

        const sweetsData = new Sweets_Model({
            image: "sweets/" + req.file?.filename,
            name, amount, category, description
        });
        await sweetsData.save();
        return res.json({ filename: "sweets/" + req.file?.filename });
    });
}

export const sweetsList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const sweetsData = await Sweets_Model.find().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Sweets_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedUsers = sweetsData?.map((sweet) => {
            i++;
            return {
                ...sweet.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedUsers,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedUsers.length,
            total: totalCount,
        };

        return res.status(200).json({
            sweetsData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching sweetsData:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching sweets",
            error: error.message
        });
    }
}

export const DeleteSweet = async (req, res) => {
    const { id } = req?.params;
    try {
        await Sweets_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'sweets delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "sweets id not found",
            error: error.message
        });
    }
}

export const updateSweets = async (req, res) => {
    await sweets.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        // const { _id, name, amount, category, description } = req.body;

        const { _id, name, amount, category, description, isSweet, isWedding, isBestSeller, isDeliveryCharge } = req.body;

        const existingSweet = await Sweets_Model.findById(_id);
        if (!existingSweet) {
            return res.status(404).json({ error: "Sweet not found" });
        }

        existingSweet.name = name || existingSweet.name
        existingSweet.category = category || existingSweet.category
        existingSweet.description = description || existingSweet.description
        existingSweet.amount = amount || existingSweet.amount


        if (typeof isWedding !== "undefined") {
            existingSweet.isWedding = isWedding === "true";
        }

        if (typeof isBestSeller !== "undefined") {
            existingSweet.isBestSeller = isBestSeller === "true";
        }

        if (typeof isDeliveryCharge !== "undefined") {
            existingSweet.isDeliveryCharge = isDeliveryCharge === "true";
        }

        if (req?.file) {
            existingSweet.image = "sweets/" + req.file?.filename
        }
        await existingSweet.save()
        return res.json({ message: "data_updated" });
    });
}

export const DeleteDecoration = async (req, res) => {
    const { id } = req?.params;
    try {
        await Decoration_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'decoration delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "decoration id not found",
            error: error.message
        });
    }
}

export const addDecoration = async (req, res) => {
    decoration.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ error: "category are required." });
        }

        const decorationData = new Decoration_Model({
            image: "decoration/" + req.file?.filename,
            category
        });
        await decorationData.save();
        return res.json({ filename: "decoration/" + req.file?.filename });
    });
}


export const decorationList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const decorationData = await Decoration_Model.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await Decoration_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedDecoration = decorationData.map((decoration) => {
            i++;
            return {
                ...decoration.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedDecoration,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedDecoration?.length,
            total: totalCount,
        };

        return res.status(200).json({
            decorationData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching decoration:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching decoration",
            error: error.message
        });
    }
}

export const deleteDesigner = async (req, res) => {
    const { id } = req?.params;
    try {
        await Designer_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'designer delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "designer id not found",
            error: error.message
        });
    }
}

export const addDesigner = async (req, res) => {
    designer.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({ error: "Name and category are required." });
        }

        const desigerData = new Designer_Model({
            image: "designer/" + req.file?.filename,
            name, category
        });
        await desigerData.save();
        return res.json({ filename: "designer/" + req.file?.filename });
    });
}


export const getDesignerList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const designernData = await Designer_Model.find().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Designer_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedDesigner = designernData.map((designer) => {
            i++;
            return {
                ...designer.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedDesigner,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedDesigner?.length,
            total: totalCount,
        };

        return res.status(200).json({
            designerData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching designer:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching designer",
            error: error.message
        });
    }
}


export const adsList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const adsData = await Ads_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Ads_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedAdsData = adsData.map((ads) => {
            i++;
            return {
                ...ads.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedAdsData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedAdsData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            adsData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching ads",
            error: error.message
        });
    }
}

export const addAds = async (req, res) => {
    ads.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const { banner } = req?.body;
        const adsData = new Ads_Model({
            image: "ads/" + req.file?.filename,
            banner
        });
        await adsData.save();
        return res.json({ filename: "ads/" + req.file?.filename });
    });
}

export const updateAds = async (req, res) => {
    await ads.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id } = req.body;
        const existAds = await Ads_Model.findById(_id);
        if (!existAds) {
            return res.status(400).json({ error: "Error ads id not found" });
        }

        let updatedData = {};
        if (req?.file) {
            const previousImagePath = path.join("uploads", existAds?.image)
            if (existAds?.image && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updatedData.image = "ads/" + req.file?.filename
        }
        await Ads_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}


export const aboutList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const aboutData = await About_model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await About_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedAboutData = aboutData.map((about) => {
            i++;
            return {
                ...about.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedAboutData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedAboutData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            aboutData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching ads",
            error: error.message
        });
    }
}

export const addAbout = async (req, res) => {
    Video.single("video")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading video" });
        }
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ error: "description are required." });
        }

        const aboutData = new About_model({
            video: "about/" + req.file?.filename,
            description
        });
        await aboutData.save();
        return res.json({ filename: "about/" + req.file?.filename });
    });
}

export const updateABout = async (req, res) => {
    Video.single("video")(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ error: "Error uploading video" });
        }

        const { _id, description } = req.body;

        const ExistAbout = await About_model.findById(_id);
        if (!ExistAbout) {
            return res.status(400).json({ error: "Error about id not found" });
        }

        let updatedData = {
            description
        };

        if (req?.file) {
            const previousImagePath = path.join("uploads", ExistAbout?.video);
            if (ExistAbout?.video && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updatedData.video = "about/" + req.file?.filename
        }
        await About_model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}

export const addReview = async (req, res) => {
    review.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const { name, designation, description } = req?.body;
        const ReviewData = new Review_Model({
            image: "review/" + req.file?.filename,
            name, description, designation
        });
        await ReviewData.save();
        return res.json({ filename: "review/" + req.file?.filename });
    });
}


export const reviewList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const reviewData = await Review_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Review_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedReviewData = reviewData.map((review) => {
            i++;
            return {
                ...review.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedReviewData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedReviewData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            reviewData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching review",
            error: error.message
        });
    }
}


export const deleteReview = async (req, res) => {
    const { id } = req?.params;
    try {
        await Review_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'review delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "review id not found",
            error: error.message
        });
    }
}

export const updateReview = async (req, res) => {
    await review.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name, designation, description } = req.body;
        if (!name || !designation || !description) {
            return res.status(400).json({ error: "Name,designation and description are required." });
        }

        const existReview = await Review_Model.findById(_id);
        if (!existReview) {
            return res.status(400).json({ error: "Error review id not found" });
        }

        const updatedData = {
            name,
            designation,
            description
        };
        if (req?.file) {
            const previousImagePath = path.join("uploads", existReview?.image);
            if (existReview?.image && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updatedData.image = "review/" + req.file?.filename
        }
        await Review_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}
export const addInvitationDesign = async (req, res) => {
    inviation.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const { name, category, description, price } = req?.body;

        const inviationData = new Invitation_Model({
            image: "invitation/" + req.file?.filename,
            name, description, category, price
        });
        await inviationData.save();
        return res.json({ filename: "invitation/" + req.file?.filename });
    });
};





export const addInvitation = async (req, res) => {
    // inviation.single("image")(req, res, async (err) => {
    inviation.fields([
        { name: "image", maxCount: 1 },
        { name: "image02", maxCount: 1 },
        { name: "image03", maxCount: 1 },
        { name: "image04", maxCount: 1 },
        { name: "videoFile", maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const { name, category, description, price } = req?.body;
        const inviationData = new Invitation_Model({
            image: "invitation/" + req.files.image[0].filename,
            image02: "invitation/" + req.files.image02[0].filename,
            image03: "invitation/" + req.files.image03[0].filename,
            image04: "invitation/" + req.files.image04[0].filename,
            videoFile: "invitation/" + req.files.videoFile[0].filename,
            name, description, category, price
        });
        await inviationData.save();
        return res.json({ filename: "invitation/" + req.file?.filename });
    });
}

export const deleteInvitation = async (req, res) => {
    const { id } = req?.params;
    try {
        await Invitation_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'invitation delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "invitation id not found",
            error: error.message
        });
    }
}

export const updateInvitation = async (req, res) => {
    inviation.fields([
        { name: "image", maxCount: 1 },
        { name: "image02", maxCount: 1 },
        { name: "image03", maxCount: 1 },
        { name: "image04", maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name, category, description, price, isInvitationBoxes, isBestSeller, isDeliveryCharge } = req.body;

        const existInvitation = await Invitation_Model.findById(_id);
        if (!existInvitation) {
            return res.status(400).json({ error: "invitation not found" });
        }

        existInvitation.name = name || existInvitation?.name;
        existInvitation.category = category || existInvitation?.category;
        existInvitation.description = description || existInvitation?.description;
        existInvitation.price = price || existInvitation?.price;

        if (typeof isBestSeller !== "undefined") {
            existInvitation.isBestSeller = isBestSeller === "true";
        }

        if (typeof isDeliveryCharge !== "undefined") {
            existInvitation.isDeliveryCharge = isDeliveryCharge === "true";
        }

        if (req.files?.image?.[0]) {
            existInvitation.image = "invitation/" + req.files.image[0].filename;
        }
        if (req.files?.image02?.[0]) {
            existInvitation.image02 = "invitation/" + req.files.image02[0].filename;
        }
        if (req.files?.image03?.[0]) {
            existInvitation.image03 = "invitation/" + req.files.image03[0].filename;
        }
        if (req.files?.image04?.[0]) {
            existInvitation.image04 = "invitation/" + req.files.image04[0].filename;
        }

        await existInvitation.save();
        return res.json({ message: "data_updated" });
    });
}


export const invitationList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const invitationData = await Invitation_Model.find().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Invitation_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedInvitationData = invitationData.map((invitation) => {
            i++;
            return {
                ...invitation.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedInvitationData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedInvitationData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            invitationData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}

export const contactUsList = async (req, res) => {
    try {
        const { page = 1, search } = req.query;
        const perPage = 10;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                ],
            };
        };

        const contactUsData = await Contact_model.find(filter).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Contact_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedContactUsData = contactUsData.map((contact) => {
            i++;
            return {
                ...contact.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedContactUsData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedContactUsData?.length,
            total: totalCount,
        };
        return res.status(200).json({
            contactUsData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching :", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}

export const addWedding = async (req, res) => {
    wedding.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name" });
        }

        const weddingData = new Wedding_Model({
            image: "wedding/" + req.file?.filename,
            name,
        });
        await weddingData.save();
        return res.json({ filename: "wedding/" + req.file?.filename });
    });
}

export const updateWedding = async (req, res) => {
    await wedding.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name, } = req.body;

        const ExistWedding = await Wedding_Model.findById(_id);
        if (!ExistWedding) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        if (!name) {
            return res.status(400).json({ error: " name are required." });
        }
        const updatedData = {
            name,
        };
        if (req?.file) {
            const preImagePath = path.join("uploads", ExistWedding?.image);
            if (ExistWedding?.image && fs.existsSync(preImagePath)) {
                fs.unlinkSync(preImagePath)
            }
            updatedData.image = "wedding/" + req.file?.filename
        }
        await Wedding_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}


export const weddingList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const weddingData = await Wedding_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Wedding_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedWeddingData = weddingData.map((wedding) => {
            i++;
            return {
                ...wedding.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedWeddingData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedWeddingData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            weddingData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching wedding",
            error: error.message
        });
    }
}

export const deleteWedding = async (req, res) => {
    const { id } = req?.params;
    try {
        await Wedding_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'wedding delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "wedding id not found",
            error: error.message
        });
    }
}

export const addDryFruit = async (req, res) => {
    dryFruit.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name, amount, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name" });
        }

        const dryFruitData = new Dry_fruit_Model({
            image: "dryFruit/" + req.file?.filename,
            name, amount, description
        });
        await dryFruitData.save();
        return res.json({ filename: "dryFruit/" + req.file?.filename });
    });
}

export const updateDryFruit = async (req, res) => {
    await dryFruit.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name, amount, description, isBestSeller } = req.body;
        if (!name) {
            return res.status(400).json({ error: " name are required." });
        }
        const updatedData = {
            name,
            amount,
            description
        };

        if (isBestSeller) {
            updatedData.isBestSeller = (isBestSeller == 'true') ? true : false
        }


        if (req?.file) {
            updatedData.image = "dryFruit/" + req.file?.filename
        }
        await Dry_fruit_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}

export const dryFruitList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const dryFruitData = await Dry_fruit_Model.find().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Dry_fruit_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedDryFruitData = dryFruitData.map((dryFruit) => {
            i++;
            return {
                ...dryFruit.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedDryFruitData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedDryFruitData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            dryFruitData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching dry fruit",
            error: error.message
        });
    }
}

export const deleteDryFruit = async (req, res) => {
    const { id } = req?.params;
    try {
        await Dry_fruit_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'dry fruit delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "dry fruit id not found",
            error: error.message
        });
    }
}

export const addBestSeller = async (req, res) => {
    bestSeller.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name" });
        }

        const dryFruitData = new Best_seller_Model({
            image: "bestSeller/" + req.file?.filename,
            name,
        });
        await dryFruitData.save();
        return res.json({ filename: "bestSeller/" + req.file?.filename });
    });
}

export const bestSellerList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const bestSellerData = await Best_seller_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Best_seller_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedBestSellerData = bestSellerData.map((bestSeller) => {
            i++;
            return {
                ...bestSeller.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedBestSellerData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedBestSellerData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            bestSellerData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching best seller data",
            error: error.message
        });
    }
}


export const deleteBestSeller = async (req, res) => {
    const { id } = req?.params;
    try {
        await Best_seller_Model.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'best seller delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "best seller id not found",
            error: error.message
        });
    }
}

export const addPlanning = async (req, res) => {
    let { category, description } = req.body;

    if (!category) {
        return res.status(400).json({ error: "category require" });
    }

    const isExistData = await PlanningModel.findOne({ category: category });
    if (isExistData) {
        const updatedDescription = [...isExistData?.description, ...description]
        await PlanningModel.findOneAndUpdate({ category }, {
            description: updatedDescription
        })
        return res.json({ message: "update planning successfully" });
    }
    const planningData = new PlanningModel({
        category, description
    });
    await planningData.save();
    return res.json({ message: "add planning successfully" });
}

export const updatePlanning = async (req, res) => {
    const { _id, category, description } = req.body;
    if (!category) {
        return res.status(400).json({ error: " category are required." });
    }
    const updatedData = {
        description
    };

    await PlanningModel.findByIdAndUpdate(_id,
        updatedData
    )
    return res.json({ message: "data_updated" });
}

export const planningList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const planningData = await PlanningModel.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await PlanningModel.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedPlanningData = planningData.map((planning) => {
            i++;
            return {
                ...planning.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedPlanningData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedPlanningData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            planningData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching plannnig",
            error: error.message
        });
    }
}

export const deletePlanning = async (req, res) => {
    const { id } = req?.params;
    try {
        await PlanningModel.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: 'planning delete successflly',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "planning id not found",
            error: error.message
        });
    }
}


export const addInvitationBox = async (req, res) => {
    invitationBox.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name" });
        }

        const invitationBoxData = new Invitation_Box_Model({
            image: "invitationBox/" + req.file?.filename,
            name,
        });
        await invitationBoxData.save();
        return res.json({ filename: "invitationBox/" + req.file?.filename });
    });
}


export const updateInvitationBox = async (req, res) => {
    await invitationBox.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name are required." });
        }
        const existingInvitationBox = await Invitation_Box_Model.findById(_id);
        if (!existingInvitationBox) {
            return res.status(404).json({ error: "invitationBox not found" });
        }

        const updatedData = {
            name,
        };
        if (req?.file) {
            const previousImagePath = path.join("uploads", existingInvitationBox?.image);
            if (existingInvitationBox?.image && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updatedData.image = "invitationBox/" + req.file?.filename
        }
        await Invitation_Box_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}

export const invitationBoxList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const invitationBoxData = await Invitation_Box_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await Invitation_Box_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedInvitationBoxData = invitationBoxData.map((invitationBox) => {
            i++;
            return {
                ...invitationBox.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedInvitationBoxData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedInvitationBoxData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            invitationBox: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}

export const addDiscoverSweets = async (req, res) => {
    discoverSweets.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name" });
        }

        const discoverSweetsData = new discover_sweets_Model({
            image: "discoverSweets/" + req.file?.filename,
            name,
        });
        await discoverSweetsData.save();
        return res.json({ filename: "discoverSweets/" + req.file?.filename });
    });
}


export const updateDiscoverSweets = async (req, res) => {
    await discoverSweets.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name are required." });
        }
        const existDiscoverSweets = await discover_sweets_Model.findById(_id);
        if (!existDiscoverSweets) {
            return res.status(404).json({ error: "discover sweets not found" });
        }

        const updatedData = {
            name,
        };
        if (req?.file) {
            const previousImagePath = path.join("uploads", existDiscoverSweets?.image);
            if (existDiscoverSweets?.image && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            updatedData.image = "discoverSweets/" + req.file?.filename
        }
        await discover_sweets_Model.findByIdAndUpdate(_id,
            updatedData
        )
        return res.json({ message: "data_updated" });
    });
}


export const discoverSweetsList = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const perPage = 10;

        const discoverSweetsData = await discover_sweets_Model.find().skip((page - 1) * perPage).limit(perPage);
        const totalCount = await discover_sweets_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedDiscoverSweetsData = discoverSweetsData.map((discoverSweet) => {
            i++;
            return {
                ...discoverSweet.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedDiscoverSweetsData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedDiscoverSweetsData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            discoverSweetsData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}


export const userList = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ],
            };
        };

        const userData = await user_Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
        const totalCount = await user_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedUserData = userData.map((user) => {
            i++;
            return {
                ...user.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedUserData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedUserData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            userData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching userdata",
            error: error.message
        });
    }
}


export const updateUser = async (req, res) => {
    const { _id, name, mobile } = req.body;
    if (!name || !mobile) {
        return res.status(400).json({ error: " name and mobile are required." });
    }
    const updatedData = {
        name, mobile
    };
    await user_Model.findByIdAndUpdate(_id,
        updatedData
    )
    return res.json({ message: "data_updated" });
}

export const customizationList = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                ],
            };
        };

        const customizationData = await Customization_model.find(filter)
            .populate("invitationId")
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await Customization_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedCustomizationData = customizationData.map((customization) => {
            i++;
            return {
                ...customization.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedCustomizationData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedCustomizationData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            customizationData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching customizationData",
            error: error.message
        });
    }
}

export const quoteList = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                ],
            };
        };

        const QuoteData = await Quote_model.find(filter)
            .populate("decorationId")
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await Quote_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedQuoteData = QuoteData?.map((quote) => {
            i++;
            return {
                ...quote.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedQuoteData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedQuoteData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            quoteData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching quoteData",
            error: error.message
        });
    }
}

export const customization = async (req, res) => {

    const { lastName, firstName, invitationId, mobile, message } = req.body;
    const customizationData = new Customization_model({
        firstName, lastName, invitationId, mobile, message
    });
    await customizationData.save();
    return res.json({ message: "added" });

}


export const bannerList = async (req, res) => {
    try {
        const images = await Banner_Model.find()
        let i = 0;
        const updatedBannerData = images.map((image) => {
            i++;
            return {
                ...image.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            banner: updatedBannerData,
        });
    }
    catch (error) {
        console.error("Error fetching images:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching images",
            error: error.message
        });
    }
}


export const userWeddingList = async (req, res) => {
    try {
        const weddingData = await Wedding_Model.find();
        let i = 0;
        const updatedWeddingData = weddingData.map((wedding) => {
            i++;
            return {
                ...wedding.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            weddingData: updatedWeddingData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching wedding",
            error: error.message
        });
    }
}

export const dryFruitById = async (req, res) => {
    try {
        const { id } = req?.params;
        const isExistDryFruit = await Dry_fruit_Model.findOne({ _id: id });
        console.log(isExistDryFruit, 'aaaaaaa')
        if (isExistDryFruit) {
            return res.status(200).json({ dryFruitData: isExistDryFruit });
        }
        return res.status(400).json({ message: 'dry_fruit_data_not_found' })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}


export const userDryFruits = async (req, res) => {
    try {
        const dryFruitData = await Dry_fruit_Model.find();

        let i = 0;
        const updatedDryFruitData = dryFruitData.map((dryFruit) => {
            i++;
            return {
                ...dryFruit.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            dryFruitData: updatedDryFruitData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching dry fruit",
            error: error.message
        });
    }
}


export const userBestSellerList = async (req, res) => {
    try {
        const bestSellerData = await Best_seller_Model.find()
        let i = 0;
        const updatedBestSellerData = bestSellerData.map((bestSeller) => {
            i++;
            return {
                ...bestSeller.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            bestSellerData: updatedBestSellerData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching best seller data",
            error: error.message
        });
    }
}


export const userDiscoverSweetsList = async (req, res) => {
    try {
        const discoverSweetsData = await discover_sweets_Model.find();
        let i = 0;
        const updatedDiscoverSweetsData = discoverSweetsData.map((discoverSweet) => {
            i++;
            return {
                ...discoverSweet.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            discoverSweetsData: updatedDiscoverSweetsData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}


export const userInvitationBoxList = async (req, res) => {
    try {

        const invitationBoxData = await Invitation_Box_Model.find();
        let i = 0;
        const updatedInvitationBoxData = invitationBoxData.map((invitationBox) => {
            i++;
            return {
                ...invitationBox.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            invitationBox: updatedInvitationBoxData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}

export const userAdsList = async (req, res) => {
    try {

        const adsData = await Ads_Model.find();
        let i = 0;
        const updatedAdsData = adsData.map((ads) => {
            i++;
            return {
                ...ads.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            adsData: updatedAdsData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching ads",
            error: error.message
        });
    }
}

export const userAboutList = async (req, res) => {
    try {
        const aboutData = await About_model.findOne();

        return res.status(200).json({
            aboutData: aboutData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching ads",
            error: error.message
        });
    }
}

export const userReviewList = async (req, res) => {
    try {
        const reviewData = await Review_Model.find()
        let i = 0;
        const updatedReviewData = reviewData.map((review) => {
            i++;
            return {
                ...review.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            reviewData: updatedReviewData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching review",
            error: error.message
        });
    }
}

export const sweetById = async (req, res) => {
    try {
        const { id } = req?.params;
        const isExistSweet = await Sweets_Model.findOne({ _id: id });
        if (isExistSweet) {
            return res.status(200).json({ sweetData: isExistSweet });
        }
        return res.status(400).json({ message: 'sweet_data_not_found' })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const userSweetsList = async (req, res) => {
    try {

        const query = {};
        const { category, isWedding, isSweet, price, search } = req?.query;
        if (category) {
            query.category = category;
        }
        if (isWedding) {
            query.isWedding = (isWedding == 'true') ? true : false
        }
        if (isSweet) {
            query.isSweet = (isSweet == 'true') ? true : false
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }


        const pipeline = [
            { $match: query },
            {
                $addFields: {
                    numericPrice: {
                        $toDouble: {
                            $arrayElemAt: [{ $split: ["$amount", "/"] }, 0]
                        }
                    }
                }
            }
        ];

        if (price && price !== 'All') {
            if (price === '700 & Above') {
                pipeline.push({
                    $match: {
                        numericPrice: { $gte: 700 }
                    }
                });
            } else if (price.includes('-')) {
                const [priceStart, priceEnd] = price.split('-').map(Number);
                pipeline.push({
                    $match: {
                        numericPrice: {
                            $gte: priceStart,
                            $lte: priceEnd
                        }
                    }
                });
            }
        }

        pipeline.push({ $sort: { numericPrice: -1 } });
        const sweetsData = await Sweets_Model.aggregate(pipeline);

        let i = 0;
        const updatedSweets = sweetsData?.map((sweet) => {
            i++;
            return {
                ...sweet,
                orderId: i,
            };
        });

        return res.status(200).json({
            sweetsData: updatedSweets,
        });
    }
    catch (error) {
        console.error("Error fetching sweetsData:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching sweets",
            error: error.message
        });
    }
}


export const firstSweetCategoryWise = async (req, res) => {
    try {
        const sweetsData = await Sweets_Model.aggregate([
            {
                $addFields: {
                    numericAmount: {
                        $toDouble: {
                            $arrayElemAt: [
                                { $split: ['$amount', '/'] },
                                0
                            ]
                        }
                    }
                }
            },
            {
                $sort: { numericAmount: -1 }
            },
            {
                $group: {
                    _id: '$category',
                    maxAmount: { $first: '$amount' },
                    image: { $first: '$image' },
                    name: { $first: '$name' },
                    originalId: { $first: '$_id' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    _id: '$originalId',
                    maxAmount: 1,
                    image: 1,
                    name: 1
                }
            }
        ])
        console.log(sweetsData)
        return res.status(200).json({
            sweetsData: sweetsData,
        });

    }
    catch (error) {
        console.error("Error fetching sweetsData:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching sweets",
            error: error.message
        });
    }
}


export const firstInvitationCategoryWise = async (req, res) => {
    try {
        const invitation = await Invitation_Model.aggregate([
            {
                $sort: {
                    price: -1
                }
            }, {
                $group: {
                    _id: '$category',
                    maxamount: { $first: '$price' },
                    name: { $first: '$name' },
                    image: { $first: '$image' },
                    originalId: { $first: '$_id' }
                }
            }, {
                $project: {
                    category: '$_id',
                    _id: '$originalId',
                    maxamount: 1,
                    name: 1,
                    image: 1
                }
            }
        ])
        return res.status(200).json({ initation: invitation })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching sweets",
            error: error.message
        });
    }
}

export const userDecorationList = async (req, res) => {
    try {
        const { category } = req.query;
        console.log("BACKEND: Received category in query:", category);
        const decorationData = await Decoration_Model.find({ category: category }).sort({ createdAt: -1 });
        console.log("BACKEND: Data fetched from DB for category '" + category + "':", decorationData);

        let i = 0;
        const updatedDecoration = decorationData.map((decoration) => {
            i++;
            return {
                ...decoration.toObject(),
                orderId: i,
            };
        });

        return res.status(200).json({
            decorationData: updatedDecoration,
        });
    }
    catch (error) {
        console.error("Error fetching decoration:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching decoration",
            error: error.message
        });
    }
}

export const userDesigner = async (req, res) => {
    try {
        const { category } = req.query;

        const designernData = await Designer_Model.find({ category: category }).sort({ createdAt: -1 });
        let i = 0;
        const updatedDesigner = designernData.map((designer) => {
            i++;
            return {
                ...designer.toObject(),
                orderId: i,
            };
        });
        return res.status(200).json({
            designerData: updatedDesigner,
        });
    }
    catch (error) {
        console.error("Error fetching designer:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching designer",
            error: error.message
        });
    }
}

export const uploadDesignQuote = async (req, res) => {
    uploadQuote.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const { name,mobile, category, description, price, userId } = req?.body;
        const uploadDesignQuote = new upload_design_quote_model({
            image: "invitationQuote/" + req.file?.filename,
            name,mobile, description, category, price, userId
        });
        await uploadDesignQuote.save();
        return res.json({ filename: "invitationQuote/" + req.file?.filename });
    });
}


export const getInvitationQuote = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                ],
            };
        };


        const inviationQuoteData = await upload_design_quote_model.find(filter).populate('userId').sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await upload_design_quote_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedInvitationQuoteData = inviationQuoteData?.map((quote) => {
            i++;
            return {
                ...quote.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedInvitationQuoteData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedInvitationQuoteData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            quoteData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching invitation quote:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching quoteData",
            error: error.message
        });
    }
}


export const userInvitationById = async (req, res) => {
    try {
        const { id } = req?.params;
        const isExistInvitation = await Invitation_Model.findOne({ _id: id });
        if (isExistInvitation) {
            return res.status(200).json({ invitation: isExistInvitation });
        }
        return res.status(400).json({ message: 'invitation_data_not_found' })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const userInvitationList = async (req, res) => {
    try {

        const { category, price, isInvitationBoxes } = req?.query;
        const query = {};

        if (price && price !== 'All') {
            if (price === '500 & Above') {
                query.price = { $gte: 500 };
            } else if (price.includes('-')) {
                const [priceStart, priceEnd] = price.split('-').map(Number);
                query.price = {
                    $gte: priceStart,
                    $lte: priceEnd,
                };
            }
        }
        if (category) {
            query.category = category;
        }
        if (isInvitationBoxes) {
            query.isInvitationBoxes = (isInvitationBoxes == 'true') ? true : false
        }


        const invitationData = await Invitation_Model.find(query).sort({ price: -1 });
        console.log(invitationData, '333')
        let i = 0;
        const updatedInvitationData = invitationData.map((invitation) => {
            i++;
            return {
                ...invitation.toObject(),
                orderId: i,
            };
        });

        return res.status(200).json({
            invitationData: updatedInvitationData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching invitation",
            error: error.message
        });
    }
}


export const addContactUsDetail = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, message } = req?.body;
        const contactUsData = await new Contact_model({
            firstName, lastName, email, mobile, message
        });
        await contactUsData.save();
        return res.status(200).json({
            message: 'successfully_add'
        });
    }
    catch (error) {
        console.error("Error fetching :", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}

export const AddQuote = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, message, decorationId } = req?.body;
        console.log(req?.body)
        const quoteData = await new Quote_model({
            decorationId,
            firstName, lastName, email, mobile, message
        });
        await quoteData.save();
        return res.status(200).json({
            message: 'successfully_add'
        });
    }
    catch (error) {
        console.error("Error fetching :", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}


export const AddDesignerQuote = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, message, designerId } = req?.body;
        const designerQuoteData = await new Designer_Quote_model({
            designerId,
            firstName, lastName, email, mobile, message
        });
        await designerQuoteData.save();
        return res.status(200).json({
            message: 'successfully_add'
        });
    }
    catch (error) {
        console.error("Error fetching :", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}

export const bestSellerData = async (req, res) => {
    try {
        const { bestSeller } = req?.query;
        const sweetData = await Sweets_Model.find({ isBestSeller: bestSeller });
        const dryFruitData = await Dry_fruit_Model.find({ isBestSeller: bestSeller });
        const invitationData = await Invitation_Model.find({ isBestSeller: bestSeller });
        const bestSellerData = [...sweetData, ...dryFruitData, ...invitationData]

        return res.status(200).json({
            message: 'get_Successfully_Data',
            bestSeller: bestSellerData
        });
    }
    catch (error) {
        console.error("Error fetching :", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}



export const createUser = async (req, res) => {
    try {
        const { mobile } = req?.body;
        if (!mobile) {
            return res.status(400).json({ message: 'mobile require' })
        }
        let user = await user_Model.findOne({ mobile: mobile });
        const otp = Math.floor(100000 + Math.random() * 900000);

        if (mobile == '7845121245') {
            otp = '123456'
        }
        if (!user) {
            user = new user_Model({
                mobile, registerBy: 'number',
                otp: otp
            });
            await user.save();
        }
        else {
            user.otp = otp;
            await user.save();
        }
        return res.status(200).json({
            message: 'successfully_add',
            otp: otp,
            userData: user
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Something went wrong while fetching contact us data",
            error: error.message
        });
    }
}

export const loginByGoogle = async (req, res) => {
    try {
        const { access_token } = req.body;

        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const profile = await googleRes.json();
        console.log(access_token, '66666666666666666666666666666')
        if (!profile) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        let user = await user_Model.findOne({ email: profile?.email });
        if (user) {
            user.token = access_token;
            await user.save();
        }
        if (!user) {
            user = await user_Model.create({
                name: profile.name,
                email: profile.email,
                registerBy: 'google',
                token: access_token
            });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JSON_SECRET, { expiresIn: "1 d" });

        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Google login failed", error: err.message });
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp, _id } = req?.body;
        if (!otp || !_id) {
            return res.status(400).json({ message: 'otp require' })
        }
        let user = await user_Model.findOne({ otp: otp, _id: _id });
        if (user) {
            user.otp = null;
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JSON_SECRET, { expiresIn: "7d" });
            await user.save();
            return res.json({ token, user });
        }
        return res.status(400).json({ message: 'otp does not match' })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong" })
    }
}


export const updateAddress = async (req, res) => {


    uploadImg.single("profile")(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ error: "Error uploading image" });
        }
        const { _id, address, name, addressBy, pincode, mobile } = req?.body;
        if (mobile) {
            const isMobileExist = await user_Model.findOne({ mobile: mobile });
            if (isMobileExist) {
                return res.status(400).json({ success: false, message: 'mobile_exist' })
            }
        }

        const isExistUser = await user_Model.findById(_id);
        if (!isExistUser) {
            return res.status(400).json({ error: "Error id not found" });
        }
        if (address)
            isExistUser.address = address || isExistUser?.address;
        if (addressBy)
            isExistUser.addressBy = addressBy || isExistUser?.addressBy;
        if (mobile)
            isExistUser.mobile = mobile || isExistUser?.mobile;
        if (name)
            isExistUser.name = name || isExistUser?.name
        if (pincode) {
            isExistUser.pincode = pincode || isExistUser?.pincode
        }

        if (req?.file) {
            const previousImagePath = path.join("uploads", (isExistUser?.profile ?? 'null'))
            if (isExistUser?.profile && fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
            }
            isExistUser.profile = "profile/" + req.file?.filename
        }
        await isExistUser.save();

        return res.json({ message: "data_updated", response: isExistUser });

    });
}


export const userDataById = async (req, res) => {
    try {
        const { id } = req?.params;
        const isExistUser = await user_Model.findOne({ _id: id });
        if (isExistUser) {
            return res.status(200).json({ userData: isExistUser });
        }
        return res.status(400).json({ message: 'user_not_found' })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const userplanningList = async (req, res) => {
    try {
        // const { userId } = req?.params;
        // const { category } = req.query;
        const planningData = await PlanningModel.find()
        // const planningData = await PlanningModel.aggregate([
        // {
        //     $match: { category: category }
        // },
        // {
        //     $lookup: {
        //         from: "planninghistories",
        //         localField: "_id",
        //         foreignField: "planningId",
        //         as: "history"
        //     }
        // },
        //     {
        //         $addFields: {
        //             userHistory: {
        //                 $filter: {
        //                     input: "$history",
        //                     as: "h",
        //                     cond: { $eq: ["$$h.userId", new mongoose.Types.ObjectId(userId.toString())] }
        //                 }
        //             }
        //         }
        //     },
        // {
        // $project: {
        //     category: 1,
        // description: 1,
        // checked: {
        //     $cond: {
        //         if: { $gt: [{ $size: "$userHistory" }, 0] },
        //         then: { $arrayElemAt: ["$userHistory.checked", 0] },
        //         else: []
        //     }
        // }
        //         }
        //     }
        // ]);
        return res.status(200).json({
            planningData: planningData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching plannnig",
            error: error.message
        });
    }
}



export const userAddPlanningHistory = async (req, res) => {
    try {
        const { userId, planningId, checked } = req?.body;
        if (!userId || !planningId || !checked) {
            return res.status(400).json({ message: "field are require" })
        }
        let isExistHistory = await Planning_History_Model.findOne({ userId: userId, planningId: planningId })
        if (!isExistHistory) {
            isExistHistory = new Planning_History_Model({ userId, planningId, checked });
            await isExistHistory.save();
        } else {
            isExistHistory.checked = checked;
            await isExistHistory.save()
        }
        return res.status(200).json({ planningDataHistory: isExistHistory })

    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}


export const userHelpRequest = async (req, res) => {
    try {
        const { userId, planningId } = req?.body;
        if (!userId || !planningId) {
            return res.status(400).json({ message: "field are require" })
        }
        const helpReq = new Planning_Help_Req_Model({ userId, planningId });
        await helpReq.save();
        return res.status(200).json({ helpReqData: helpReq })

    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const designerQuoteList = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                ],
            };
        };

        const QuoteData = await Designer_Quote_model.find(filter)
            .populate("designerId")
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await Designer_Quote_model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const updatedQuoteData = QuoteData?.map((quote) => {
            i++;
            return {
                ...quote.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: updatedQuoteData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + updatedQuoteData?.length,
            total: totalCount,
        };
        console.log(paginationDetails, "asss+")

        return res.status(200).json({
            quoteData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching quoteData",
            error: error.message
        });
    }
}

export const userEventList = async (req, res) => {
    try {
        const { userId } = req?.params;
        const { category } = req.query;
        const planningData = await PlanningModel.aggregate([
            {
                $match: { category: category }
            },
            {
                $lookup: {
                    from: "planninghistories",
                    localField: "_id",
                    foreignField: "planningId",
                    as: "history"
                }
            },
            {
                $addFields: {
                    userHistory: {
                        $filter: {
                            input: "$history",
                            as: "h",
                            cond: { $eq: ["$$h.userId", new mongoose.Types.ObjectId(userId.toString())] }
                        }
                    }
                }
            },
            {
                $project: {
                    category: 1,
                    description: 1,
                    checked: {
                        $cond: {
                            if: { $gt: [{ $size: "$userHistory" }, 0] },
                            then: { $arrayElemAt: ["$userHistory.checked", 0] },
                            else: []
                        }
                    }
                }
            }
        ]);
        return res.status(200).json({
            userCheckedEvent: planningData,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching plannnig",
            error: error.message
        });
    }
}


export const planningHelpReq = async (req, res) => {
    try {
        const { search, page = 1 } = req.query;
        const perPage = 10;

        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { mobile: { $regex: search, $options: "i" } },
                ],
            };
        };

        const PlanningRq = await Planning_Help_Req_Model.find(filter)
            .populate("planningId")
            .populate("userId")
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalCount = await Planning_Help_Req_Model.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);
        let i = 0;
        const planningHelpReqData = PlanningRq?.map((quote) => {
            i++;
            return {
                ...quote.toObject(),
                orderId: i,
            };
        });
        const paginationDetails = {
            current_page: parseInt(page),
            data: planningHelpReqData,
            first_page_url: `${baseURL}api/admin?page=1`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${baseURL}api/admin?page=${totalPages}`,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false,
                },
                {
                    url: `${baseURL}api/admin?page=${page}`,
                    label: page.toString(),
                    active: true,
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false,
                },
            ],
            next_page_url: null,
            path: `${baseURL}api/admin`,
            per_page: perPage,
            prev_page_url: null,
            to: (page - 1) * perPage + planningHelpReqData?.length,
            total: totalCount,
        };

        return res.status(200).json({
            planningHelpReqData: paginationDetails,
            page: page.toString(),
            total_rows: totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching ads:", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching quoteData",
            error: error.message
        });
    }

}


export const updatePrivacyPolicy = async (req, res) => {
    try {
        const { data } = req.body;
        const isPrivacyPolicy = await PrivacyPolicyModel.findOne();
        if (!isPrivacyPolicy) {
            const newPolicy = new PrivacyPolicyModel({ data });
            await newPolicy.save();
            return res.status(201).json({
                message: "Privacy policy added successfully!",
            });
        }
        isPrivacyPolicy.data = data;
        await isPrivacyPolicy.save();
        return res.status(200).json({
            message: "privacy policy updated successfully!",
        });

    } catch (error) {
        console.error("Update  Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



export const termAndCondition = async (req, res) => {
    try {
        const { data } = req.body;
        const isTermAndCondition = await TermAndConditionModel.findOne();
        if (!isTermAndCondition) {
            const newTermAndCondition = new TermAndConditionModel({ data });
            await newTermAndCondition.save();
            return res.status(201).json({
                message: "term and condition added successfully!",
            });
        }
        isTermAndCondition.data = data;
        await isTermAndCondition.save();
        return res.status(200).json({
            message: "term and condition updated successfully!",
        });

    } catch (error) {
        console.error("Update  Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



export const shipping = async (req, res) => {
    try {
        const { data } = req.body;
        const shipping = await ShippingModel.findOne();
        if (!shipping) {
            const newShipping = new ShippingModel({ data });
            await newShipping.save();
            return res.status(201).json({
                message: "shipping added successfully!",
            });
        }
        shipping.data = data;
        await shipping.save();
        return res.status(200).json({
            message: "shipping updated successfully!",
        });

    } catch (error) {
        console.error("Update  Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



export const paymentRefund = async (req, res) => {
    try {
        const { data } = req.body;
        const isPaymentRef = await PaymentRefundModel.findOne();
        if (!isPaymentRef) {
            const newPolicy = new PaymentRefundModel({ data });
            await newPolicy.save();
            return res.status(201).json({
                message: "Payment Ref added successfully!",
            });
        }
        isPaymentRef.data = data;
        await isPaymentRef.save();
        return res.status(200).json({
            message: "Payment Ref updated successfully!",
        });

    } catch (error) {
        console.error("Update  Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getAllGuests = async (req, res) => {
    try {
        
        const allGuests = await Guest_Model.find({}).populate('userId', 'name email');

        if (!allGuests || allGuests.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No guests found.'
            });
        }

        res.status(200).json({
            success: true,
            count: allGuests.length, 
            guests: allGuests
        });

    } catch (error) {
        console.error("Error by admin:", error);
        res.status(500).json({
            success: false,
            message: 'server problem'
        });
    }
};


export const getAllPaymentHistory = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        
        
        const query = {};

        
        const totalRecords = await Payment_History_Model.countDocuments(query);

        
        const totalPages = Math.ceil(totalRecords / perPage);

        // 4. सिर्फ उस पेज का डेटा लाएं जिसकी ज़रूरत है
        const paymentHistories = await Payment_History_Model.find(query)
            .populate('userId', 'name email') 
            .sort({ createdAt: -1 })         
            .skip((page - 1) * perPage)      
            .limit(perPage)                  
            .exec();

        
        res.status(200).json({
            success: true,
            message: "Successfully received all payment history",
            data: paymentHistories,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalRecords: totalRecords
            }
        });

    } catch (error) {
        console.error("Error during receiving payment history:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


export const getPaymentHistoryByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userPaymentHistory = await Payment_History_Model.find({ userId: userId })
                                                            .populate('userId', 'name email'); // यूज़र का नाम और ईमेल भी साथ में लाएं

        if (!userPaymentHistory || userPaymentHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "not found history for particular user"
            });
        }

        res.status(200).json({
            success: true,
            message: "received payment hsitory userid",
            data: userPaymentHistory
        });

    } catch (error) {
        console.error("error during payment history:", error);
        res.status(500).json({
            success: false,
            message: "server error"
        });
    }
};
export const getGuestsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const guests = await Guest_Model.find({ userId: userId })
                                        .populate('userId', 'name'); 

        if (!guests || guests.length === 0) {
            return res.status(404).json({
                success: false,
                message: "not user found fotr particular Userid"
            });
        }

        res.status(200).json({
            success: true,
            message: "succseccfully received guest of user",
            count: guests.length,
            data: guests
        });

    } catch (error) {
        console.error("error during bring guest of user:", error);
        res.status(500).json({
            success: false,
            message: "server error"
        });
    }
};