import axios from 'axios';
export const baseUrl = 'http://10.70.152.28:2121';

const axiosInstance = axios.create({
    baseURL : baseUrl,
    Origin:"http://localhost"
});

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, "网络错误");
    }
)

export {
    axiosInstance
}