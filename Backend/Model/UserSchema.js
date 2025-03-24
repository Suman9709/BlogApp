
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true} )



userSchema.pre("save", async function(next){
if(!this.isModified("password"))
    return next();

this.password = await bcrypt.hash(this.password, 10)
return next();
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function(){
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES || "5h"
    return jwt.sign(
        {
            _id:this.id,
            name:this.name,
            username:this.username,

        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    const expiresIn=process.env.REFRESH_TOKEN_EXPIRES || '7d'
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn,
        }
    )
};

const User = mongoose.model("User", userSchema)

export default User;