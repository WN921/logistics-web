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
const mapConfig = {
    mapCenter: [108.76476277325438, 34.03414322398297],
    zoom: 17,
    denominator: 50000
}
export {
    axiosInstance,
    mapConfig
}