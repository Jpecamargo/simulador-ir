import axios from "axios"
import nookies from "nookies";

export const api = axios.create({
    baseURL: "http://localhost:4000"
});

api.interceptors.request.use(config => {
    const cookies = nookies.get();
    const token = cookies.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});