import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './Config/db.js';
import AdminRouter from './Routes/Admin.routes.js';
import UserRouter from './Routes/User.rotes.js';
import Razorpay from 'razorpay';
import crypto from 'crypto'
import { paymentHistory } from './Controllers/UserController.js';

const app = express();
connectDb()
dotenv.config();
// app.use(cors());
app.use(cors({
  origin: 'https://admin.laaagi.com',
  credentials: true,
}));
app.use(express.json())
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static('uploads/banner'))
app.use('/uploads', express.static('uploads/sweets'))
app.use("/uploads", express.static('uploads/decoration'))
app.use("/uploads", express.static('uploads/ads'))
app.use("/uploads", express.static('uploads/designer'))
app.use("/uploads", express.static('uploads/about'))
app.use("/uploads", express.static('uploads/review'))
app.use("/uploads", express.static("uploads/invitation"))
app.use("/uploads", express.static("uploads/bestSeller"))
app.use("/uploads", express.static("uploads/discoverSweets"))
app.use("/uploads", express.static("uploads/invitationBox"))
app.use("/uploads", express.static("uploads/profile"))
// const customizationRoutes = require('../routes/customizationRoutes.js'); 

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_QpiAXSeb8pm1CJ',
    key_secret: process.env.RAZORPAY_SECRETKEY
});


app.post('/createOrder', (req, res) => {
    const { amount, currency, receipt } = req.body;
    razorpayInstance.orders.create({ amount, currency, receipt },
        (err, order) => {
            if (!err)
                res.json(order)
            else
                res.send(err);
        }
    )
});

app.post('/verifyOrder', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount } = req.body;
    const key_secret = process.env.RAZORPAY_SECRETKEY
    let hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (razorpay_signature === generated_signature) {
        return await paymentHistory(req, res)
    }
    else {
        return res.json({ success: false, message: "Payment verification failed" })

    }
});



app.use('/api/admin', AdminRouter)
app.use('/api/user', UserRouter)
// app.use("/api/user", routes);


const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
    console.log(`Base Url ${BASE_URL}`)
});
app.get('/', (req, res) => {
    res.send('Profile API is running...');
});

// Mount Routers
// app.use('/api/user', userRoutes);