import { userModel } from "@/models/user.models";
import { userNameValidation } from "@/schemas/signupSchema";
import dbConnect from "@/lib/dbConnect";
import {z} from 'zod'


// we want schema alwyas when we use zod 

const userNameQuearySchema = z.object({
    // here we say every user follw these rule fo the username validation schema
    userName : userNameValidation
})


export async function GET(req : Request){

   

    await dbConnect();

    try {
        // take the complte url
        const {searchParams} = new URL(req.url)
        console.log(searchParams);
        
        const queryParam = {
            // from url take the username value 
            userName : searchParams.get('username') || ''
        }

        console.log(queryParam , 'username');
        
        // now vaidate the username is unique or not 
         const result = userNameQuearySchema.safeParse(queryParam)

         if(!result.success){
            const usernameError = result.error.format().userName?._errors || []
            return Response.json(
                { success: false, message: usernameError.length > 0 ? usernameError.join(', ') : 'Invalid username' },
                { status: 400 }
            );
         }

         console.log('username is unique' , result);
         

         // if my username formate is valid then cheeck in the database it same user present or not

         const {userName} = result.data
            const existingUser = await userModel.findOne({userName , isVerified : true})

            if(existingUser){
                return Response.json(
                    { success: false, message: "Username already taken" },
                    { status: 400 }
                );
            }

            return Response.json(
                { success: true, message: "Username is available" },
                { status: 200 }
            );

    } catch (error) {
        console.log("🚀 error checking username unique" ,error);
        return Response.json(
            { success: false, message: "error when check the uername unique" },
            { status: 500 }
        );
    }
}