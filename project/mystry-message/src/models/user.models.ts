import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema<messageType>({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

const userSchema = new Schema<userType>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    isFinite: {
        type: Boolean,
        required: true,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        required: true,
        default: true,
    },
    messages: [messageSchema]
})



const userModel = (mongoose.models.User as mongoose.Model<userType>) || mongoose.model<userType>('User' , userSchema);