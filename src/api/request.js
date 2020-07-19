import { axiosInstance } from "./config";

export const getUavListRequest = () => {
    return axiosInstance.get("/uav/getUavList");
}

export const getOrderListRequest = () => {
    return axiosInstance.get("/order/getOrderList");
}