
import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/models/user.models";
import bcrypt from "bcryptjs";
import { sendVerificationMail } from "@/helpers/sendVerificationMail";



export async function POST(request: Request): Promise<Response> {
    //connect the database
    await dbConnect();

    try {
        const { userName, email, password } = await request.json()

        // if the user already exists
        const existingUserVerifiedByUsername = await userModel.findOne({
            userName,
            isVerified: true
        })


        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    sucess: false,
                    message: 'Username already taken'
                },
                { status: 400 }
            )
        }


        //check if user exists by email then go to if block 
        const existingUserByEmail = await userModel.findOne({email})
         const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        if(existingUserByEmail){

            // if the user is exist and also verified then do nothing
             if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        sucess: false,
                        message: 'Email already registered. Please login.'
                    },
                    { status: 400 }
                )
            }else{

                // if user exist but not verified then update the details
                const hasedPassword = await bcrypt.hash(password , 10)
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry
                existingUserByEmail.userName = userName;
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = otp;
                existingUserByEmail.verifyCodeExpiry = expiryDate;
                await existingUserByEmail.save();
            }
        }else{

            const hasedPassword = await bcrypt.hash(password , 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry
            
            const newUser = new userModel({
                userName,
                email,
                password: hasedPassword,
                verifyCode: otp,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save();
        }


        // send verification mail
      const emailResponse =   await sendVerificationMail(email, userName , otp);

      // if response is not sucess
      if(!emailResponse.sucess){
        return Response.json({
            sucess: false,
            message:  emailResponse.message
        },
            { status: 500 }
        )
      }

      // if everything is sucess
       return Response.json({
            sucess: false,
            message:  "User Registered Successfully. Please verify your email.",
        },
            { status: 201 }
        )

    } catch (error) {
        console.log('Error in sign-up route:', error);
        return Response.json({
            sucess: false,
            message: 'Error Registring User'
        },
            { status: 500 }
        )
    }

}