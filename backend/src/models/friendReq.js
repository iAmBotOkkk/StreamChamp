import mongoose from "mongoose";


const friendReqSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String,
        enum : ["pending" , "accepted"],
        default : "pending"
    }
},{
    timestamps : true
})

const FriendRequest = mongoose.model("FriendRequest" , friendReqSchema)
export default FriendRequest;