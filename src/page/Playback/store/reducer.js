import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { actionCreators } from '.';
const defaultState = fromJS({
    HistoryList : [],
    SelectedRecord : [],
})

export default (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_HISTORY_LIST:
            return state.set('HistoryList', action.data);
        case actionTypes.CHANGE_SELECTED_RECORD:
            return state.set('SelectedRecord', action.data);
        default:
            return state;
    }
}