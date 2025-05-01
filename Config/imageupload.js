import multer from "multer";
import path from "path";

const uploadBanner = multer.diskStorage({
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

const uploadSweets = multer.diskStorage({
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

const uploadDecoration = multer.diskStorage({
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

const uploadDesigner = multer.diskStorage({
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

const uploadAds = multer.diskStorage({
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

const uploadReview = multer.diskStorage({
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

const uploadInvitation = multer.diskStorage({
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

const uploadWedding = multer.diskStorage({
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

const uploadDryFruit = multer.diskStorage({
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

const uploadBestSeller = multer.diskStorage({
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

const uploadInvitationBox = multer.diskStorage({
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

const uploadDiscoverSweets = multer.diskStorage({
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

const uploadProfile = multer.diskStorage({
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

const banner = multer({ storage: uploadBanner });
const sweets = multer({ storage: uploadSweets });
const decoration = multer({ storage: uploadDecoration })
const designer = multer({ storage: uploadDesigner })
const ads = multer({ storage: uploadAds })
const review = multer({ storage: uploadReview });
const inviation = multer({ storage: uploadInvitation })
const wedding = multer({ storage: uploadWedding })
const dryFruit = multer({ storage: uploadDryFruit })
const bestSeller = multer({ storage: uploadBestSeller })
const invitationBox = multer({ storage: uploadInvitationBox })
const discoverSweets = multer({ storage: uploadDiscoverSweets })
const profile=multer({storage:uploadProfile})

export { banner, sweets, decoration, designer, ads, review, inviation, wedding, dryFruit, bestSeller, invitationBox, discoverSweets,profile };