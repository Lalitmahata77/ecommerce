import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsycError from "./catchAsycError.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = catchAsycError(async(req,res,next)=>{
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Invalid token",400))
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

export const authorizeRole = (...roles) =>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role(${req.user.role}) is not allow to acess this resource`)
            )
        }
        next()
    }
}