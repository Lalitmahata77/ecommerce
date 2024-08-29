import mongoose from "mongoose";
import becrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
  
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },

},{timestamps : true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }
    this.password = await becrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn : "15d"
    })
}

userSchema.methods.isPasswordCorrect = async function(enterPassword){
return await becrypt.compare(enterPassword,this.password)
}


const User = mongoose.model("User", userSchema)
export default User