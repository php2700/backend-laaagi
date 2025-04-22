import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './Config/db.js';
import AdminRouter from './Routes/Admin.routes.js';
import UserRouter from './Routes/User.rotes.js';

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

app.use('/api/admin', AdminRouter)
app.use('/api/user', UserRouter)

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
    console.log(`Base Url ${BASE_URL}`)
});