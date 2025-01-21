import axios from "axios"
import nookies, { parseCookies } from "nookies";

export const api = axios.create({
    baseURL: "http://localhost:4000"
});

api.interceptors.request.use(config => {
    const { "simuladorIR.token": token } = parseCookies();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});