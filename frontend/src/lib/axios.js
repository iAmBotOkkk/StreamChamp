import axios from "axios";

export const Instance = axios.create({
    baseURL : "http://localhost:6001/api",
    withCredentials : true
});