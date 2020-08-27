//reducer.js
import { combineReducers } from 'redux-immutable';
import { reducer as monitorreducer } from '../page/Monitor/store';
import { reducer as playbackreducer } from '../page/Playback/store';
export default combineReducers({
    // 之后开发具体功能模块的时候添加 reducer
    monitor: monitorreducer,
    playback: playbackreducer
});