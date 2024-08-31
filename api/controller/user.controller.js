import catchAsycError from "../middleware/catchAsycError.js";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
// import sendToken from "../utils/sendToken.js";
import bcrypt from 'bcryptjs'
import createToken from "../utils/sendToken.js";
export const register = catchAsycError(async(req,res,next)=>{
    const {username,password,email} = req.body;
    if (!username || !password || !email) {
        return next(new ErrorHandler("Username , password and email required"))
    }
    const existedUser = await User.findOne({email})
    if (existedUser) {
        return next(new ErrorHandler("User already exist"))
    }

    if (password.length < 6) {
        return next(new ErrorHandler("Paaword must be at least 6 character"))
    }

    const user = new User({username,password,email})
    try {
        await user.save()
        createToken(res, user._id);
        res.status(200).json({
            success : true,
            _id : user._id,
            username : user.username,
            password : user.password,
            email : user.email,
            isAdmin: newUser.isAdmin,
        })
        
    } catch (error) {
        console.log(error.message);
        
    }
})

export const login = catchAsycError(async(req,res,next)=>{
    const {email,password} = req.body;
    if (!email || !password) {
        return next (new ErrorHandler("email or password is required"))
    }
    const existingUser = await User.findOne({email}).select("+password")
    if (!existingUser) {
        return next(new ErrorHandler("user not found"))
    }
    const isPasswordMatch = await existingUser.isPasswordCorrect(password)
    if (!isPasswordMatch) {
       return next(new ErrorHandler("check Email or password",400))
    }
    if (isPasswordMatch) {
      const token =     createToken(res, existingUser._id);
  
        res.status(201).json({
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
token
        })
        return
    }
})

export const logout = catchAsycError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires :new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({message : "Logout successfully"})
})

export const getAllUser = catchAsycError(async(req,res,next)=>{
    const allUser = await User.find({})
    res.status(200).json({allUser})
})

export const userProfile = catchAsycError(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (!user) {
        return next(new ErrorHandler("User not found with that id",400))
    }
    res.status(200).json(user)
})

//update password
export const updatePassword = catchAsycError(async(req,res,next)=>{
    const user = await User.findById(req.user?._id).select("+password")
    const isPasswordMatch = await user.isPasswordCorrect(req.body.oldPassword)
    if (!isPasswordMatch) {
      return next(new ErrorHandler("old password is incorrect.", 400))
    }
    user.password = req.body.password
    user.save()
    res.status(200).json({
      success : true
    })

})

export const updateUser = catchAsycError(async(req,res,next)=>{
    
    // const newUser = {
    //     username : req.body.username,
    //     email : req.body.email
    // }
    // const user = await User.findByIdAndUpdate(req.user._id, newUser,{new : true})
    // if (!user) {
    //     return next(new ErrorHandler("User not found with that id",400))
    // }
    // res.status(200).json({user})

    const user = await User.findById(req.user._id);


  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

export const updateUserByAdmin = catchAsycError(async(req,res,next)=>{
    const newUser = {
        username : req.body.username,
        email : req.body.email,
        role : req.body.role
    }
    const user = await User.findByIdAndUpdate(req.user._id,newUser,{new:true})
    if (!user) {
        return next(new ErrorHandler("User not found with that id",400))
    }
    res.status(200).json({user})
})

export const deleteUser = catchAsycError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler("User not found with that id",400))
    }
    await user.deleteOne()
    res.status(200).json({success:true,message:"User deleted"})
})
export const getUserByAdmin = catchAsycError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler("User not found with that id",400))
    }
    res.status(200).json({user})
})