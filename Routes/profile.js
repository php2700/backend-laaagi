const express = require("express");
const router = express.Router();
const Profile = require('./models/Profile');

router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).send('Server Error');
    }
});
router.put('/', async (req, res) => {
    const { name, mobile, location, bio, avatarUrl } = req.body;

    const profileFields = {};
    if (name !== undefined) profileFields.name = name;
    if (mobile !== undefined) profileFields.mobile = mobile;
    if (location !== undefined) profileFields.location = location;
    if (bio !== undefined) profileFields.bio = bio;
    if (avatarUrl !== undefined) profileFields.avatarUrl = avatarUrl;

    try {
        let profile = await Profile.findOneAndUpdate(
            {}, 
            { $set: profileFields }, // The fields to update
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(profile); 
    } catch (err) {
        console.error('Error updating profile:', err.message);
         if (err.name === 'ValidationError') {
            return res.status(400).json({ errors: err.errors });
         }
        res.status(500).send('Server Error');
    }
});

