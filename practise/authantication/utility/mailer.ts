import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
interface SendEmailProps {
  email: string;
  emailType: "VERIFY_EMAIL" | "RESET_PASSWORD";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId } : SendEmailProps) => {
  try {

    const hasedToken = await bcrypt.hash(userId.toString() , 10)


if(emailType === "VERIFY_EMAIL"){
    await User.findByIdAndUpdate(userId , {verifyToken : hasedToken   , verifyTokenExpiry : Date.now() + 3600000})  // 1 hour
}else if(emailType === "RESET_PASSWORD"){
        await User.findByIdAndUpdate(userId , {forgotPasswordToken : hasedToken   , verifyTokenExpiry : Date.now() + 3600000})  // 1 hour
}



    const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAIL_TOKEN ,
  })
);

    // Wrap in an async IIFE so we can use await.
    (async () => {
      const info = await transport.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email,
        subject: emailType === "VERIFY_EMAIL" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?Token=${hasedToken}"> here </a> </p>`, 
      });

      console.log("Message sent:", info);
      return info
    })();
  } catch (error :  any) {
    throw new Error("Error sending email" + error.message);
  }
};
