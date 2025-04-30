import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './Config/db.js';
import AdminRouter from './Routes/Admin.routes.js';
import UserRouter from './Routes/User.rotes.js';
import Razorpay from 'razorpay';

const app = express();
connectDb()
dotenv.config();
app.use(cors());
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

// const razorpayInstance = new Razorpay({
//     // Replace with your key_id
//     key_id: rzp_test_fiIwmRET6CApc2,
//     // Replace with your key_secret
//     key_secret: YAEUthsup8SijNs3iveeVlL1
// });


app.post('/createOrder', (req, res) => {
    const { amount, currency, receipt, notes } = req.body;
    razorpayInstance.orders.create({ amount, currency, receipt, notes },
        (err, order) => {
            if (!err)
                res.json(order)
            else
                res.send(err);
        }
    )
});

//Inside app.js
app.post('/verifyOrder',  (req, res)=>{ 
    
    // STEP 7: Receive Payment Data
    const {order_id, payment_id} = req.body;     
    const razorpay_signature =  req.headers['x-razorpay-signature'];

    // Pass yours key_secret here
    const key_secret = YAEUthsup8SijNs3iveeVlL1;     

    // STEP 8: Verification & Send Response to User
    
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 

    // Passing the data to be hashed
    hmac.update(order_id + "|" + payment_id);
    
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
    
    
    if(razorpay_signature===generated_signature){
        res.json({success:true, message:"Payment has been verified"})
    }
    else
    res.json({success:false, message:"Payment verification failed"})
});



app.use('/api/admin', AdminRouter)
app.use('/api/user', UserRouter)

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
    console.log(`Base Url ${BASE_URL}`)
});