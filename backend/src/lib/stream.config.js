import {StreamChat} from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!(apiKey && apiSecret)) {
    console.error("Invalid api key or secret")
}


const streamClient = StreamChat.getInstance(apiKey, apiSecret)


export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error upserting streamUser" , error)
    }
}

export const generateStreamToken = (userId) => {
    try {
    const userIdstr = userId.toString();
    return streamClient.createToken(userIdstr);
          
    } catch (error) {
       console.log("error in generating stream token" , error.message);
        
    }
}