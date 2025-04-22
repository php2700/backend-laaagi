import Contact_model from "../Models/Contact_us.model.js";
import { Guest_Model } from "../Models/guest.model.js";

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
        console.log(req?.body)
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
        const guestData = await Guest_Model.find({ userId: userId })
        console.log(guestData, 'rrrrr')
        return res.status(200).json({ guestList: guestData })
    } catch (error) {
        return res.status(400).json({ message: error?.message })
    }
}

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