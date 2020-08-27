import { axiosInstance } from "./config";

export const getUavListRequest = () => {
    return axiosInstance.get("/uav/getUavList");
}

export const getOrderListRequest = () => {
    return axiosInstance.get("/order/getOrderList");
}

export const getHistoryListRequest = () => {
    return axiosInstance.get('/history/getHistoryList');
}

export const getSelectedRecordRequest = (recordID) => {
    return axiosInstance.get('/history/getHistoryInfo', {
        params : {
            table : recordID
        }
    })
}