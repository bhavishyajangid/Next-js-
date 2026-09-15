import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/models/user.models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/providers/auth";
import { User } from "next-auth";
import { log } from "console";

// mark the toggle isAceppting the message or not 
export async function POST(request: Request) {
  await dbConnect()
  
  // getServerSession give the access of the current session and it neet authoption to work every time so we provide it 
  const session = await getServerSession(authOptions)


  // take user value from session becase when i am make the authoptions we put the user value in the session so npow we get this value
  const currentUser = session?.user

  if(!session || !currentUser){
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
  );
  }

 const userId = currentUser.id
 
 try {
    const {acceptMessage} = await request.json()

    const updatedUser = await userModel.findByIdAndUpdate(
        userId, 
       {isAcceptingMessages : acceptMessage} ,
       {new : true}
    )

    if(!updatedUser){
          return Response.json(
            { success: false, message: "user not found" },
            { status: 401 }
        );
    }

    return Response.json(
        { success: true, message: "Settings updated successfully", data: updatedUser },
        { status: 200 }
    );



 } catch (error) {
    console.log("🚀 error accept message" ,error);
    return Response.json(
        { success: false, message: "error when accept message" },
        { status: 500 }
    );
 }

}


export async function GET(request: Request) {
  await dbConnect()
  
  // getServerSession give the access of the current session and it neet authoption to work every time so we provide it 
  const session = await getServerSession(authOptions)


  // take user value from session becase when i am make the authoptions we put the user value in the session so npow we get this value
  const currentUser = session?.user

  if(!session || !currentUser){
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
  );
  }

 const userId = currentUser.id

 
    try {
         const foundUser = await userModel.findById(userId)

     if(!foundUser){
          return Response.json(
            { success: false, message: "user not found" },
            { status: 401 }
        );
    }

    return Response.json(
        { success: true, message: "Settings fetched successfully", data: {isAcceptingMessages : foundUser.isAcceptingMessages} },
        { status: 200 }
    );
    } catch (error) {
        console.log("🚀 error get accept message" ,error)
        return Response.json(
            { success: false, message: "error when get accept message" },
            { status: 500 }
        );
        
    }
 
    
 

}