import React from 'react';
import { List, Typography, Descriptions, Divider } from 'antd';
import { fix } from '../../api/utils';

export default function InformationList(props) {
    let { UavList, OrderList } = props;
    OrderList = OrderList ? OrderList.toJS() : [];
    UavList = UavList ? UavList.toJS() : [];

    const { SelectedUavId } = props;

    const OrderNumber = OrderList.length;
    let FinishedOrder = 0;
    let DispatchingOrder = 0;
    let WaitingOrder = 0;
    let TotalWaitTime = 0;
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].orderState === '等待中') {
            WaitingOrder++;
        }
        else if (OrderList[i].orderState === '完成') {
            FinishedOrder++;
        }
        else if (OrderList[i].orderState === '配送中') {
            DispatchingOrder++;
        }
        TotalWaitTime += OrderList[i].orderWaitTime;
    }
    let AveragedTime = TotalWaitTime / OrderNumber;



    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Descriptions title="指定无人机信息" style={{ margin: "auto" }}>
                <Descriptions.Item label="编号">{SelectedUavId}</Descriptions.Item>
                <Descriptions.Item label="速度（km/s)">
                    {
                        UavList.length > 0 ? fix(UavList[SelectedUavId].moveVelocityX) + ',' + fix(UavList[SelectedUavId].moveVelocityY) + ',' + fix(UavList[SelectedUavId].moveVelocityZ) : "无"
                    }
                </Descriptions.Item>
                <Descriptions.Item label="位置">
                    {
                        UavList.length > 0 ? fix(UavList[SelectedUavId].longitude) + ',' + fix(UavList[SelectedUavId].latitude) : '无'
                    }
                </Descriptions.Item>
                <Descriptions.Item label="货重（kg）">
                    {
                        UavList.length > 0 ? UavList[SelectedUavId].loadAbilityActualLoadWeight : '无'
                    }
                </Descriptions.Item>
                <Descriptions.Item label="剩余空间（g）">
                    {
                        UavList.length > 0 ? UavList[SelectedUavId].cruisingAbilityCapacity : '无'
                    }
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="订单统计信息" style={{ margin: "auto" }}>
                <Descriptions.Item label="订单总数">{OrderNumber}</Descriptions.Item>
                <Descriptions.Item label="已完成订单数"> {FinishedOrder}</Descriptions.Item>
                <Descriptions.Item label="派送中订单数">{DispatchingOrder}</Descriptions.Item>
                <Descriptions.Item label="等待中订单数">{WaitingOrder}</Descriptions.Item>
                <Descriptions.Item label="平均等待时间">{fix(AveragedTime / 60) + 'min'}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <List
                itemLayout="horizontal"
                dataSource={OrderList}
                renderItem={item => {
                    return (<List.Item>
                        <List.Item.Meta
                            title={'订单编号：' + item.orderId}
                            description={(()=><div>
                                <div>起始地：{fix(item.orderOriginLongitude) + "," + fix(item.orderOriginLatitude)}</div>
                                <div>目的地：{fix(item.orderDestinationLongitude) + "," + fix(item.orderDestinationLatitude)}</div>
                                <div>订单重量：{fix(item.orderWeight)}</div>
                                <div>订单状态：{item.orderState} </div>
                            </div>)()}
                        />
                    </List.Item>
                    )
                }}
                style={{ height: "250px", overflow: 'auto' }}
            />
        </div>
    )
}