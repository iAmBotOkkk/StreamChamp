
import mongoose from "mongoose"
export const connDb = async () => {
    
    try {
        const conn = await  mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb  connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDb" , error);
        process.exit(1)
    }
}