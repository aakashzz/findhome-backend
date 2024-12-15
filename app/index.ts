import "dotenv/config"

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
app.use("/user",UserRouter)


app.listen(port,"localhost",()=>{
    console.log("App Running", port)
})