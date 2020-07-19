import React, { Component } from 'react';
import { Button } from 'antd';
import { message_change } from './action';
import store from './Store';

var showData; // 全局变量存储回调函数的值
showData = {};
showData.uavs = [];
showData.crowd = {};

export default class SocketDemo extends Component {
    render() {
        var ROSLIB = require('roslib');

        var ros = new ROSLIB.Ros({
            url: 'ws://10.70.166.8:9090'
        });

        ros.on('connection', function () {
            console.log('Connected to websocket server.');
        });

        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
        });

        

        // Subscribing to a Topic
        // ----------------------
        var uav_data = new ROSLIB.Topic({
            ros: ros,
            name: '/uav_data',
            messageType: 'demo/UAVData'
        });

        var crowd_data = new ROSLIB.Topic({
            ros: ros,
            name: '/crowd_data',
            messageType: 'demo/CrowdData'
        });

        var event_comm = new ROSLIB.Topic({
            ros: ros,
            name: '/event_comm',
            messageType: 'std_msgs/String'
        });

        uav_data.subscribe(function (msg) {
            var index = msg.id - 1;
            if (showData.uavs[index] == undefined) {
                showData.uavs[index] = {};
            }
            showData.uavs[index].id = msg.id;
            showData.uavs[index].realPos = [msg.real_pos.x, msg.real_pos.y, msg.real_pos.z];
            showData.uavs[index].realVel = [msg.real_vel.x, msg.real_vel.y, msg.real_vel.z];
            showData.uavs[index].calcPos = [msg.calc_pos.x, msg.calc_pos.y, msg.calc_pos.z];
            // console.log(' uav'+showData.uavs[index].id+' realPos='+showData.uavs[index].realPos.join(','));
            // uav_data.unsubscribe();
        });

        crowd_data.subscribe(function (msg) {
            showData.crowd.state = msg.state;
            showData.crowd.algorithm = msg.algorithm;
            showData.crowd.pathWidth = msg.path_width;
            // console.log(' pathWidth='+showData.crowd.pathWidth);
            // crowd_data.unsubscribe();
        });
        // 定时输出showData对象的情况 用于debug
        var interval = setInterval(function () { store.dispatch(message_change(showData));}, 2000);
        return (
            <div>
                <Button type="primary" icon="poweroff" onClick={() => {
                    var msg = new ROSLIB.Message({
                        data: 'start'
                    });
                    event_comm.publish(msg);
                    console.log('start success');
                }}>
                    开始
                </Button>
            </div>
        )
    }
}





