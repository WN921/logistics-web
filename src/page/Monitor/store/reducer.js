import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS({
    UavList : [],
    OrderList : [],
    SlectedUavId : 0,
})

export default (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_UAVLIST:
            return state.set('UavList', action.data);
        case actionTypes.CHANGE_ORDERLIST:
            return state.set('OrderList', action.data);
        case actionTypes.CHANGE_SELECTEDUAVID:
            return state.set('SlectedUavId', action.data);
        default:
            return state;
    }
}