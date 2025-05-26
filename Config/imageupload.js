import multer from "multer";
import path from "path";

const bannerFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banner/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadBanner = multer({
  storage: bannerFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const SweetFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/sweets/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadSweets = multer({
  storage: SweetFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const decorationFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/decoration/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadDecoration = multer({
  storage: decorationFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const DesignerFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/designer/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadDesigner = multer({
  storage: DesignerFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const adsFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ads/");
  },

  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadAds = multer({
  storage: adsFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});


const reviewFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/review/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadReview = multer({
  storage: reviewFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});


const invitationFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/invitation/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadInvitation = multer({
  storage: invitationFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const weddingFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/wedding/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});


const uploadWedding = multer({
  storage: weddingFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const dryFruitFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/dryFruit/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadDryFruit = multer({
  storage: dryFruitFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});


const bestSellerFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/bestSeller/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadBestSeller = multer({
  storage: bestSellerFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const invitationBoxFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/invitationBox/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadInvitationBox = multer({
  storage: invitationBoxFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const discoverSweetsFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/discoverSweets/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadDiscoverSweets = multer({
  storage: discoverSweetsFile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

const profile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/");
  },
  filename: async (req, file, cb) => {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime().toString();
      const uniqueSuffix = timestamp;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    } catch (err) {
      console.error("Error generating filename:", err);
      cb(err);
    }
  },
});

const uploadProfile = multer({
  storage: profile,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  }
});

// const banner = multer({ storage: uploadBanner });
const banner = uploadBanner
const sweets = uploadSweets;
// const sweets = multer({ storage: uploadSweets });
// const decoration = multer({ storage: uploadDecoration })
const decoration = uploadDecoration
// const designer = multer({ storage: uploadDesigner })
const designer = uploadDesigner
// const ads = multer({ storage: uploadAds })
const ads = uploadAds
// const review = multer({ storage: uploadReview });
const review = uploadReview
// const inviation = multer({ storage: uploadInvitation })
const inviation = uploadInvitation
// const wedding = multer({ storage: uploadWedding })
const wedding = uploadWedding
// const dryFruit = multer({ storage: uploadDryFruit })
const dryFruit = uploadDryFruit
// const bestSeller = multer({ storage: uploadBestSeller })
const bestSeller = uploadBestSeller
// const invitationBox = multer({ storage: uploadInvitationBox })
const invitationBox = uploadInvitationBox
// const discoverSweets = multer({ storage: uploadDiscoverSweets })
const discoverSweets = uploadDiscoverSweets
// const uploadImg = multer({ storage: uploadProfile })
const uploadImg = uploadProfile

export { banner, sweets, decoration, designer, ads, review, inviation, wedding, dryFruit, bestSeller, invitationBox, discoverSweets, uploadImg };
