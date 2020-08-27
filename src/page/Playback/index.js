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

function Playback(props) {
    const { HistoryList, SelectedRecord } = props;
    const { getHiststoryListDispatch, getSelecteRecordDispatch } = props;
    return (
        <Content style={{ margin: '0 16px' }}>
            <Row>
                <Col span={18}>
                    <div className="site-layout-background col" >
                        <PlaybackMap SelectedRecord={SelectedRecord}/>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="site-layout-background col" style={{textAlign: 'center'}}>
                        <PlaybackMenu 
                        HistoryList={HistoryList}
                        SelectedRecord={SelectedRecord} 
                        getHiststoryListDispatch={getHiststoryListDispatch}
                        getSelecteRecordDispatch={getSelecteRecordDispatch}
                        />
                    </div>
                </Col>
            </Row>
        </Content>
    )
}
const mapStateToProps = (state) => ({
    HistoryList : state.getIn(['playback', 'HistoryList']),
    SelectedRecord : state.getIn(['playback', 'SelectedRecord'])
})
const mapDispatchToProps = (dispatch) => {
    return {
        getHiststoryListDispatch(){
            dispatch(actionCreators.getHistoryList());
        },
        getSelecteRecordDispatch(recordID){
            dispatch(actionCreators.getSelecteRecord(recordID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playback);