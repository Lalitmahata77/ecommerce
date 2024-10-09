import express from "express"
import path from "path"
const app = express()
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js"
import cookieParser from "cookie-parser"
dotenv.config({path : "api/config/config.env"}) 
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import userRoute from './route/userRoute.js'
import categoryRoute from "./route/categoryRoute.js"
import productRoute from "./route/productRoute.js"
import uploadRoutes from "./route/uploadRoute.js";
import orderRoute from "./route/orderRoute.js"
app.use("/api/v2",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/products",productRoute)
app.use("/api/upload", uploadRoutes);
app.use("/api/order",orderRoute)


app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is listening on port : ${PORT}`);
    
})