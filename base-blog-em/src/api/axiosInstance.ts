import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default axiosInstance
