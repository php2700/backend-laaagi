// // server/middleware/uploadMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const UPLOADS_FOLDER = './uploads/';

// // Ensure uploads directory exists
// if (!fs.existsSync(UPLOADS_FOLDER)){
//     fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
//     console.log(`Created directory: ${path.resolve(UPLOADS_FOLDER)}`);
// } else {
//     console.log(`Uploads directory already exists: ${path.resolve(UPLOADS_FOLDER)}`);
// }

// // Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, UPLOADS_FOLDER);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter to allow only specific image types
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|pdf/;
//     const mimetype = allowedTypes.test(file.mimetype);
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//         return cb(null, true);
//     }
//     cb(new Error('Error: File upload only supports the following filetypes - ' + allowedTypes), false);
// };

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
//     fileFilter: fileFilter
// });

// // Middleware to handle 'designFile' field
// // This specific middleware is for a single file upload with the field name 'designFile'
// const uploadDesignFile = upload.single('designFile');

// module.exports = uploadDesignFile;