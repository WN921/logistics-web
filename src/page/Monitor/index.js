import React from 'react';
import { Layout, Row, Col } from 'antd';
import Map from '../../component/Map';
import InformationList from '../../component/InformationList';
import Charts from '../../component/Charts';
import SmallMenu from '../../component/SmallMenu';
import * as actionTypes from './store/actionCreaters';
import { connect } from 'react-redux';

const { Content } = Layout;

function Monitor(props) {
    const { UavList, OrderList, SelectedUavId } = props;
    const { getUavListDispatch, getOrderListDispatch, changeSelectedUavIdDispatch } = props;
    return (
        <Content style={{ margin: '0 16px' }}>
            <Row>
                <Col span={12}>
                    <div className="site-layout-background col" >
                        <Map
                        UavList={UavList}
                        OrderList={OrderList}
                        changeSelectedUavIdDispatch={changeSelectedUavIdDispatch} />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="site-layout-background col" >
                        <InformationList UavList={UavList} OrderList={OrderList} SelectedUavId={SelectedUavId}/>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="site-layout-background col" >
                        <Charts UavList={UavList} OrderList={OrderList} SelectedUavId={SelectedUavId}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <SmallMenu
                UavList={UavList}
                SelectedUavId={SelectedUavId}
                getUavListDispatch={getUavListDispatch}
                getOrderListDispatch={getOrderListDispatch}
                changeSelectedUavIdDispatch={changeSelectedUavIdDispatch}
                />
            </Row>
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    UavList: state.getIn(['monitor', 'UavList']),
    OrderList: state.getIn(['monitor', 'OrderList']),
    SelectedUavId : state.getIn(['monitor', 'SlectedUavId'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getUavListDispatch() {
            dispatch(actionTypes.getUavList());
        },
        getOrderListDispatch() {
            dispatch(actionTypes.getOrderList())
        },
        changeSelectedUavIdDispatch(id){
            dispatch(actionTypes.changeSelectedUavId(id))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Monitor));
