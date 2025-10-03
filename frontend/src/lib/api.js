import {Instance} from "./axios.js"

export const signup = async (formData) => {
    const response = await Instance.post("/auth/signup", formData);
    return response.data;
}

export const signin = async(signinData) => {
    const response = await Instance.post("/auth/signin", signinData);
    return response.data;
}

export const getAuthUser = async () => {
          const response = await Instance.get("/auth/me");
          return response.data;
        
}

export const onboard = async (FormState) => {
    const response = await Instance.post("/auth/onboarding" , FormState);
    return response.data
}