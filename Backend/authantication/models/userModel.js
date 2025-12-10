
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
     userName : {
        type : String,
        required : [true , 'Please provide a userName'],
        unique : true
     },
     email : {
        type : String,
        required : [true , 'Please provide a email'],
        unique : true 
     },
     password : {
        type : String,
        required : [true , 'Please provide a email'],
     }, 
     isVerified : {
        type : Boolean,
        default : true
     }, 
     isAdmin : {
        type : Boolean,
        default : true
     },
     forgotPasswordToken : String,
     forgotPasswordTokenExpiry : Date,
     verifyToken : String,
     verifyTokenExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users" , userSchema)

export default User