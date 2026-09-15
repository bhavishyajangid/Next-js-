import { userModel } from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {
 await dbConnect()

 try {
    const {userName , otp} = request.json()

    const decodeUserName = decodeURIComponent(userName)

    const user = await userModel.findOne({userName : decodeUserName})


    if(!user){
          return Response.json(
            { success: false, message: "user not found" },
            { status: 500 }
        );
    }

    const isOtpValid = user.verifyCode == otp
    const isOtpNotExpire = new Date(user.verifyCodeExpiry) > new Date()

    if(isOtpValid && isOtpNotExpire){
        user.isVerified = true
        await user.save()

        return Response.json(
            { success: true, message: "Account verified sucessfully" },
            { status: 200 }
        );
    }else if(!isOtpNotExpire){
             return Response.json(
            { success: false, message: "Otp Expiry Please Signup Again" },
            { status: 400 }
        );
    }else{
         return Response.json(
            { success: false, message: "Invalid Otp" },
            { status: 400 }
        );
    }

 } catch (error) {
     console.log("🚀 error verify otp" ,error);
        return Response.json(
            { success: false, message: "error when verify otp" },
            { status: 500 }
        );
 }
}