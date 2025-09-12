import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
    // baseURL: "https://dine-easy-restaurant-server.vercel.app"
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stop by interceptors', token);

        // it should be match where previously used
        // `Bearer ${token}`
        // authorization

        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {

        return response;

    }, async (error) => {
        const status = error.response.status
        // console.log('Status error in the interceptor', status);

        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;
