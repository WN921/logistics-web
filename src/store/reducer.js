//reducer.js
import { combineReducers } from 'redux-immutable';
import { reducer as monitorreducer } from '../page/Monitor/store';
export default combineReducers({
    // 之后开发具体功能模块的时候添加 reducer
    monitor: monitorreducer
});