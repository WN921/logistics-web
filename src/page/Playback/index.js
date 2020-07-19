import React from 'react';
import {
	Switch,
	Route,
	Link
} from "react-router-dom";
function Test(props){
    const {location, match, history} = props;
    console.log("location is", location);
    console.log("match is", match);
    console.log("history is", history);
    return(
        <div>test组件</div>
    )
}
export default function Playback(){
    return(
        <div>
            这是轨迹回放页面
        </div>
    )
}