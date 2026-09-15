import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/models/user.models";
import bcrypt from "bcryptjs";
import { sendVerificationMail } from "@/helpers/sendVerificationMail";

export async function POST(request: Request): Promise<Response> {
    console.log("🚀 Signup API called");

    // connect the database
    await dbConnect();
    console.log("✅ Database connected");

    try {
        const body = await request.json();
        console.log("📦 Request body:", body);

        const { userName, email, password } = body;

        // check username
        console.log("🔍 Checking username:", userName);
        const existingUserVerifiedByUsername = await userModel.findOne({
            userName,
            isVerified: true
        });
        console.log("👤 Username check result:", existingUserVerifiedByUsername);

        if (existingUserVerifiedByUsername) {
            console.log("❌ Username already taken");
            return Response.json(
                { success: false, message: "Username already taken" },
                { status: 400 }
            );
        }

        // check email
        console.log("📧 Checking email:", email);
        const existingUserByEmail = await userModel.findOne({ email });
        console.log("📧 Email check result:", existingUserByEmail);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("🔐 Generated OTP:", otp);

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                console.log("❌ Email already verified");
                return Response.json(
                    { success: false, message: "Email already registered. Please login." },
                    { status: 400 }
                );
            } else {
                console.log("♻ Updating existing unverified user");

                const hashedPassword = await bcrypt.hash(password, 10);
                console.log("🔑 Password hashed");

                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);

                existingUserByEmail.userName = userName;
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = otp;
                existingUserByEmail.verifyCodeExpiry = expiryDate;

                await existingUserByEmail.save();
                console.log("✅ User updated");
            }
        } else {
            console.log("🆕 Creating new user");

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("🔑 Password hashed");

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new userModel({
                userName,
                email,
                password: hashedPassword,
                verifyCode: otp,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            });

            await newUser.save();
            console.log("✅ New user saved");
        }

        console.log("📨 Sending verification email...");
        const emailResponse = await sendVerificationMail(email, userName, otp);
        console.log("📨 Email response:", emailResponse);

        if (!emailResponse.success) {
            console.log("❌ Email sending failed");
            return Response.json(
                { success: false, message: emailResponse.message },
                { status: 500 }
            );
        }

        console.log("🎉 Signup successful");
        return Response.json(
            {
                success: true,
                message: "User Registered Successfully. Please verify your email."
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("🔥 Error in sign-up route:", error);
        return Response.json(
            { success: false, message: "Error Registering User" },
            { status: 500 }
        );
    }
}
