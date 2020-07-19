import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getUavListRequest, getOrderListRequest } from '../../../api/request';
export const changeUavList = (data) => ({
    type : actionTypes.CHANGE_UAVLIST,
    data : fromJS(data)
})
export const changeOrderList = (data) => ({
    type : actionTypes.CHANGE_ORDERLIST,
    data : fromJS(data)
})

export const changeSelectedUavId = (id) => ({
    type : actionTypes.CHANGE_SELECTEDUAVID,
    data : id,
})

const transform = (origin, isLong = true) => {
    const defaultLongitude = 108.7652;
    const defaultLatitude = 34.0328;

    let result;
    if(isLong){
        result = defaultLongitude + (origin / 10000);
    }
    else{
        result = defaultLatitude + (origin / 10000);
    }
    return result;
}

export const getUavList = () => {
    return (dispatch) => {
        getUavListRequest()
        .then((data) => {
            for(let i = 0; i < data.length; i++){
                data[i].longitude = transform(data[i].longitude, true);
                data[i].latitude = transform(data[i].latitude, false);
            }
            dispatch(changeUavList(data));
        })
        .catch(() => {
            console.log('无人机列表数据传输错误');
        });
    }
}
export const getOrderList = () => {
    return (dispatch) => {
        getOrderListRequest()
        .then((data) => {
            for(let i = 0; i < data.length; i++){
                data[i].orderOriginLongitude = transform(data[i].orderOriginLongitude, true);
                data[i].orderOriginLatitude = transform(data[i].orderOriginLatitude, false);
                data[i].orderDestinationLongitude = transform(data[i].orderDestinationLongitude, true);
                data[i].orderDestinationLatitude = transform(data[i].orderDestinationLatitude, false);
            }
            dispatch(changeOrderList(data));
        })
        .catch(() => {
            console.log('订单列表数据传输错误');
        });
    }
}