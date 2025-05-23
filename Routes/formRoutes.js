const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const { submitDesign } = require('../controllers/designController');
const { submitDesign } = require('./controllers/formController.js');
import { submitDesign } from '../Controllers/formController.js';


// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, JPG, and PNG files are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// POST /api/user/forms
router.post('/', upload.single('designFile'), submitDesign);

module.exports = router;
