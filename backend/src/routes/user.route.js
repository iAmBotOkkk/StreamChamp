import { protectRoute } from "../middlewares/auth.middleware.js";
import express from "express"
import { getMyFriends, getRecommendedUsers, SendFriendRequest,
         acceptFriendRequest, getFriendRequests, getOutgoingfriendRequest } 
from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/recommendedUsers" , getRecommendedUsers);
router.get("/friends" , getMyFriends);
router.post("/friendRequest/:id" , SendFriendRequest);
router.put("/friendRequest/:id/accept" , acceptFriendRequest);
router.get("/friendRequests" , getFriendRequests );
router.get("/outgoing-friend-request" , getOutgoingfriendRequest)

export default router;