import { Instance } from "./axios.js"

export const signup = async (formData) => {
    const response = await Instance.post("/auth/signup", formData);
    return response.data;
}

export const signin = async (signinData) => {
    const response = await Instance.post("/auth/signin", signinData);
    return response.data;
}

export const logout = async () => {
    const response = await Instance.post("/auth/logout");
    return response.data
}
export const getAuthUser = async () => {
    try {
        const response = await Instance.get("/auth/me");
        return response.data;
    } catch (error) {
        console.log("error in getAuthUser", error);
        return null
    }

}

export const onboard = async (FormState) => {
    const response = await Instance.post("/auth/onboarding", FormState);
    return response.data
}

export const getMyFriends = async () => {
    const response  = await Instance.get("/users/friends");
    return response.data
}

export const getRecommendedUsers = async () => {
    const response = await Instance.get("/users/recommendedUsers");
    return response.data;
}

export const getOutgoingReqs = async () => {
    const response = await Instance.get("/users/outgoing-friend-request");
    return response.data
}

export const sendFriendRequest = async (userId) => {
    const response = await Instance.post(`/users/friendRequest/${userId}`);
    return response.data
} 