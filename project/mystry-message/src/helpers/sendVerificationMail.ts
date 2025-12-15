import { resend } from '@/lib/resend';
import { verificationEmailTemp } from '../../emailstemp/verificationEmailTemp';

export async function sendVerificationMail(email : string , userName : string , otp : string) : Promise<APIResponse>{
    try {

          const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'verification code',
      react: verificationEmailTemp({ userName , otp  }),
    });
        return {
            sucess : true,
            data : data,
            message : `Otp sent successfully ${error}`
        }
    } catch (emailError) {
        console.log('Error while sending the otp', emailError)
        return {
            sucess : false,
            message : 'Error while sending the otp'
        }
    }
}