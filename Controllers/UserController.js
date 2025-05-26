import Contact_model from "../Models/Contact_us.model.js";
import Customization_model from "../Models/Customization.model.js";
import { Guest_Model } from "../Models/guest.model.js";

// import User from '../Models/User.js';

// const DesignRequest = require('./models/DesignRequest');

import { Payment_History_Model } from "../Models/payment_history.js";
import User from '../Models/User.js';
import { user_Model } from "../Models/User.model.js";


export const addContactDetails = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, message } = req.body;

        if (!firstName || !lastName || !email || !mobile || !message) {
            return res.status(400).json({ error: "fields are reqired " });
        }

        const contactDetailsData = new Contact_model({
            firstName, lastName, email, mobile, message
        });
        await contactDetailsData.save();
        return res.json({ message: "data_added" });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const AddGuest = async (req, res) => {
    try {
        const { userId, name, address, category, email, mobile, guestNo, pincode } = req?.body;

        if (!userId || !name || !category || !email || !mobile) {
            return res.status(400).json({ message: "field are require" })
        }

        let isExistGuest = await Guest_Model.findOne({ userId: userId, mobile: mobile })
        if (isExistGuest) {
            return res.status(400).json({ message: 'mobile_already_exist' })
        }
        const guestData = new Guest_Model({
            userId, name, address, category, email, mobile, guestNo, pincode
        })
        await guestData.save()
        return res.status(200).json({ guestData: guestData })

    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const guestList = async (req, res) => {
    try {
        const { userId } = req?.params;
        const { q } = req?.query;
        let filterData = {}
        if (q) {
            filterData.$or = [
                { name: { $regex: q, $options: 'i' } },
                { address: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }

            ];
        }
        filterData.userId = userId
        const guestData = await Guest_Model.find(filterData)
        // console.log(guestData, 'rrrrr')
        return res.status(200).json({ guestList: guestData })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

export const editGuest = async (req, res) => {
    try {
        const { _id,
            name, mobile, guestNo, address,
            email, category,
            pincode } = req?.body;
        const updateData = {};
        if (name) {
            updateData.name = name
        }
        if (mobile) {
            updateData.mobile = mobile
        }
        if (guestNo) {
            updateData.guestNo = guestNo
        }
        if (address) {
            updateData.address = address
        }
        if (email) {
            updateData.email = email
        }
        if (category) {
            updateData.category = category
        }
        if (pincode) {
            updateData.pincode = pincode
        }
        const isExistGuestData = await Guest_Model.findOne({ _id: _id })
        if (isExistGuestData) {
            await Guest_Model.findByIdAndUpdate(_id, updateData)
            return res.status(200).json({ message: 'data-update-successfully' })
        }
        return res.status(400).json({ message: 'no-data-found' })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}


export const updateAddressPerson = async (req, res) => {
    try {
        const { address, mobile, pincode } = req.body;

        const isExistGuestData = await Guest_Model.findOne({ mobile });
        if (isExistGuestData) {
            isExistGuestData.address = address;
            isExistGuestData.pincode = pincode;
            await isExistGuestData.save();
            return res.status(200).json({ message: 'Data updated successfully' });
        }
        return res.status(404).json({ message: 'Guest not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};


export const deleteGuest = async (req, res) => {
    try {
        const { id } = req?.params;
        const isExistGuest = await Guest_Model.findOne({ _id: id });
        if (isExistGuest) {
            await Guest_Model.findByIdAndDelete(id);
            return res.status(200).json({ message: 'successfully_delete' })
        }
        return res.status(400).json({ message: 'guest id not found' })
    }
    catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}



export const getUserProfile = (async (req, res) => {
    const user = req.user;
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            location: user.location,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
            memberSince: user.memberSince, // Agar schema mein hai
            createdAt: user.createdAt, // Mongoose timestamp
            updatedAt: user.updatedAt  // Mongoose timestamp
        });
    } else {
        res.status(404);
        throw new Error('User not found'); // asyncHandler yeh error handle karega
    }
});

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.mobile = req.body.mobile || user.mobile;
        user.location = req.body.location || user.location;
        user.bio = req.body.bio || user.bio;
        user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email, // Email wahi rahega
            mobile: updatedUser.mobile,
            location: updatedUser.location,
            bio: updatedUser.bio,
            avatarUrl: updatedUser.avatarUrl,
            memberSince: updatedUser.memberSince,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};



export const createCustomizationRequest = async (req, res) => {

    try {
        console.log("---------------------------------", req.body)
        const { firstName, lastName, mobile, message, invitationId } = req.body;

        if (!firstName || !lastName || !mobile) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: First Name, Last Name, Phone Number.',
            });
        }

        const newRequest = new Customization_model({
            invitationId,
            firstName,
            lastName,
            mobile,
            message,
        });

        const savedRequest = await newRequest.save();
        res.status(201).json({
            success: true,
            message: 'Customization request received and saved successfully!',
            data: savedRequest,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: `Validation Failed: ${messages.join(', ')}`
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to save the customization request due to a server error.',
            error: error.message
        });
    }
};


export const paymentHistory = async (req, res) => {
    try {
        console.log("Received payment request:", req.body);

        const { guest, sweets, weight, amount, userId, razorpay_order_id, invitationName, boxName, invAmounts, invitationImg, boxAmount, invDesc } = req?.body;

        if (!weight || !amount || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Weight, amount, and userId are required.',
            });
        }

        if (!Array.isArray(guest)) {
            return res.status(400).json({
                success: false,
                message: 'guest and sweet must be arrays.',
            });
        }

        const newPayment = new Payment_History_Model({
            guest,
            weight,
            amount,
            userId,
            razorpay_order_id,
            invitationName,
            boxName, invAmounts, invitationImg, boxAmount, invDesc, sweets
        });

        console.log(newPayment, "newPaymet")

        const savedPayment = await newPayment.save();
        return res.status(200).json({
            success: true,
            message: 'Payment history saved successfully!',
            data: savedPayment,
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: `Validation Failed: ${messages.join(', ')}`
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Failed to save payment history due to a server error.',
            error: error.message
        });
    }
};



export const getPaymentHistory = async (req, res) => {
    try {
        const { userId } = req?.params;
        const { q } = req?.query;

        if (!userId) {
            return res.status(400).json({ message: "Missing userId" });
        }

        let filterData = {};
        if (q) {
            filterData.$or = [
                { name: { $regex: q, $options: 'i' } },
                { address: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ];
        }

        filterData.userId = userId;

        const paymentHistoryDocs = await Payment_History_Model.find(filterData);
        const paymentHistory = await Promise.all(paymentHistoryDocs?.map(async (paymentDoc) => {
            const payment = paymentDoc.toObject();
            const updatedGuests = await Promise.all(payment.guest?.map(async (guest) => {
                let guestData = await Guest_Model.findOne({ _id: guest?.guestId }).lean();
                if (!guestData) {
                    guestData = await user_Model.findOne({ _id: guest?.guestId }).lean();
                }
                return {
                    ...guest,
                    name: guestData?.name || null,
                    address: guestData?.address || null
                };
            }));
            payment.guest = updatedGuests;
            return payment;
        }));



        return res.status(200).json({ paymentHistory });
    } catch (error) {
        console.error("Error fetching payment history:", error);
        return res.status(400).json({ message: error?.message || "Something went wrong" });
    }
};
