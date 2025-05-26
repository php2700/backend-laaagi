// // middlewares/uploadDesignFileMiddleware.js
// import multer from "multer";
// import path from "path";

// // Destination & filename
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/designs/");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + "-" + file.originalname);
//     },
// });

// // File filter - only accept images or PDFs
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|pdf/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error("FileTypeError: Only JPEG, PNG, and PDF files are allowed!"));
//     }
// };

// // Max file size = 5MB
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// export const uploadDesignFile = upload.single("designFile");
