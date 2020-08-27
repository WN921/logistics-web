import React from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Layout, Row, Col } from 'antd';
import { connect } from 'react-redux';
import  PlaybackMap  from '../../component/PlaybackMap';
import PlaybackMenu from '../../component/PlaybackMenu';
import * as actionCreators from '../Playback/store/actionCreaters';

const { Content } = Layout;

function Simulation(props) {
    return (
        <Content style={{ margin: '0 16px' }}>
            <iframe  src='http://10.70.152.28:8080/' style={{width:'100%', height:'100%'}}/>
        </Content>
    )
}

export default Simulation;