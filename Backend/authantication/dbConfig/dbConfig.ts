import mongoose from "mongoose";

export const connectDb = async() => {

    try {
        mongoose.connect(process.env.MONGO_URL || "")
        const connection = mongoose.connection

        // ensure the connection is successfully 
        connection.on('connection' , () =>{
            console.log('Database connected successfully')
        })


        // ensure for any error while connecting to the database
        connection.on('error' , (err) =>{
            console.log('Error while connecting to the database', err)
            process.exit()
        })

    } catch (error) {
        console.log('Something went wrong in connecting to the database' , error)
    }
    
}