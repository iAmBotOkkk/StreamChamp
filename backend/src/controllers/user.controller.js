import User from "../models/schema.js";
import FriendRequest from "../models/friendReq.js";


export const getRecommendedUsers = async (req , res) => {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id : {$ne: currentUserId}},
                {_id : {$nin: currentUser.friends}},
                {isOnboarded :  true}
            ]
        })
        res.json(recommendedUsers)
    } catch (error) {
        console.log("Error in getRecommendedUsers controller" , error);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const getMyFriends = async(req , res) => {

    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends",
            "fullname profilePic nativeLanguage learningLanguage" 
        )
        return res.status(200).json(user.friends)
    } catch (error) {
        console.log("Error in getMyfriends controller" , error.message);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const SendFriendRequest = async (req,res) => {
    const myId = req.user.id;
    const {id: recipientId} = req.params;
  try {
    

    if(myId === recipientId) {
        return res.status(404).json({message : "Cannot send  friend request to yourself"});
    }

    const recipient = await User.findById(recipientId);
    if(!recipient){
        return res.status(404).json({message : "recipient not found"});
    }
    const myself = await User.findById(myId)
    if(myself.friends.includes(recipient)){
        return res.status(400).json({message : "Already friends"});
    }

    const existingRequest = await FriendRequest.findOne({
        $or : [
            {sender: myId , recipient: recipientId},
            {sender: recipientId, recipient: myId}
        ]
    });


    if(existingRequest){
        return res.status(400).json({message : "Request sent already"})
    }

    const friendRequest  = await FriendRequest.create({
        sender : myId,
        recipient : recipientId
    })

     res.status(201).json(friendRequest)
     } catch (error) {
     console.log("Error in SendFriendRequest controller" , error.message);
     return res.status(500).json({message : "Internal server error"})
  }

}

export const acceptFriendRequest = async(req,res) => {

    try {
    const {id : requestId} = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if(!friendRequest) {
        return res.status(400).json({message : "Request not found" });
    }

    if(friendRequest.recipient.toString() !== req.user.id){
        return res.status(401).json({message : "You are not authorized to accept the request"})
    }

    friendRequest.status = "accepted"
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
        $addToSet : { friends : friendRequest.recipient}
    });

    await User.findByIdAndUpdate(friendRequest.recipient,{
        $addToSet : {friends : friendRequest.sender}
    });

    res.json({message : "Friend request accepted"})
        
    } catch (error) {
        console.log("Error in acceptFriendRequest controller" , error.message);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const getFriendRequests = async(req,res) =>{
    try {
        const incomingRequest = await FriendRequest.find({
            recipient : req.user.id,
            status : "pending"
        }).populate("recipient, fullname profilePic learningLanguage nativeLanguage");

        const acceptedreq = await FriendRequest.find({
            sender : req.user.id,
            status : "accepted"
            }).populate("sender","fullname profilePic");

            return res.json({incomingRequest , acceptedreq})
    } catch (error) {
        console.log("error in getFriendRequest controller" , error.message);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const getOutgoingfriendRequest = async(req,res)=> {
    try {
        const outgoingFriendReq = await FriendRequest.find({
            sender : req.user.id,
            status : "pending"
        }).populate("recipient", "fullname profilePic nativeLanguage learningLanguage");

        res.status(200).json({ outgoingFriendReq})

    } catch (error) {
        console.log("error in getOutgoingfriendRequest component" , error.message);
        res.status(500).json({ message :"Internal server error"})
    }
}