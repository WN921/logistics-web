import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getHistoryListRequest, getSelectedRecordRequest } from '../../../api/request';
import { transform } from '../../../api/utils';

export const changeHistoryList = (data) => ({
    type : actionTypes.CHANGE_HISTORY_LIST,
    data : fromJS(data)
})

export const changeSelectedRecord = (data) => ({
    type : actionTypes.CHANGE_SELECTED_RECORD,
    data : fromJS(data)
})

export const getHistoryList = () => {
    return (dispatch) => {
        getHistoryListRequest()
        .then((data) => {
            dispatch(changeHistoryList(data));
        })
        .catch((err) => {
            console.log('历史列表数据传输错误', err);
        })
    }
}

export const getSelecteRecord = (recordID) => {
    return (dispatch) => {
        getSelectedRecordRequest(recordID)
        .then((data) => {
            let nodes = new Set();
            for(let i = 0; i < data.length; i++){
                data[i].longitude = transform(data[i].posX);
                data[i].latitude = transform(data[i].posY, false);
                if(!nodes.has(Number(data[i].uavId))){
                    nodes.add(Number(data[i].uavId));
                }
            }
            
            let newData = new Array(nodes.size);
            for(let i = 0; i < newData.length; i++){
                newData[i] = [];
            }
            for(let i = 0; i < data.length; i++){
                newData[data[i].uavId].push(data[i]);
            }
            dispatch(changeSelectedRecord(newData));
        })
        .catch((err) => {
            console.log('选中记录数据传输错误', err);
        })
    }
}

