import "dotenv/config"
import {prisma } from "./config/config"
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port:number = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN
}))


//routes installing this block
import UserRouter from "./public/users/user.routes"
import HomeRouter from "./public/homes/home.routes"
import BookingRouter from "./public/bookings/booking.routes"
import SearchRouter from "./public/search/search.routes"

app.use("/user",UserRouter)
app.use("/home",HomeRouter)
app.use("/booking",BookingRouter)
app.use("/search",SearchRouter)

prisma.$connect().then(()=>{
    console.info("Server Start In DB Connect")
    app.listen(port,"localhost",()=>{
        console.log("App Running", port)
    })
}).catch((error)=>{
    console.error(error)
})