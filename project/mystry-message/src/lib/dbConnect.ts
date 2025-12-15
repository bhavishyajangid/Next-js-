import mongoose from "mongoose";

// make a type of this varible
type connectionObj = {
    isConnected ?: number
}

// make a object type connectionobj
const connection : connectionObj = {}


async function dbConnect(): Promise<void>{
    
    // check is the db is already connected or not
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }


    try {
       const db = await mongoose.connect(process.env.MONGODB_URL || "")

       // if the db not connected already then set the connection.isConnected 
        connection.isConnected = db.connections[0].readyState; 
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error);
        // if error get then exit the process
        process.exit(1);
    }

}

export default dbConnect;