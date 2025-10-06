import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMyFriends, getRecommendedUsers } from "../lib/api";
import { useEffect, useState } from "react";

export const HomePage = () => {

      const queryClient = useQueryClient();
      const [outgoingRequestIds , setOutgoingRequestIds] = useState(new Set())
      const {data : getFriends=[] , isLoading : loadingFriends} = useQuery({
        queryKey : ["friends"],
        queryFn : getMyFriends
      })
      const {data : recommendedUsers=[] , isLoading : loadingRecommendedUsers} = useQuery({
        queryKey : ["recommendedUsers"],
        queryFn : getRecommendedUsers
      })

      const {data : outGoingFriendRequest , isLoading : loadingOutgoingFriendRequest} = useQuery({
        queryKey : ["outgoingReqs"],
        queryFn : getOutgoingReqs
      })
        const {mutate : sendFriendRequestMutation , isPending} = useMutation({
            mutationFn : sendFriendRequest,
            onSuccess : () => {queryClient.invalidateQueries({queryKey :[outGoingFriendRequest]})}
        })

        useEffect(() => {
            const outgoingIds = new Set();
            if(outGoingFriendRequest && outGoingFriendRequest.length > 0){
                outGoingFriendRequest.forEach((req) => {
                    outgoingIds.add(req.id);
                });
                setOutgoingRequestIds(outgoingIds)
            }
        },[outGoingFriendRequest])
      
    return (
        <div>
            Homepage
        </div>
    )
}