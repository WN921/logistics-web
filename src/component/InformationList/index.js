import React from 'react';
import { List, Typography, Descriptions, Divider } from 'antd';

export default function InformationList(props) {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Descriptions title="指定无人机信息" style={{ margin: "auto" }}>
                <Descriptions.Item label="编号">19</Descriptions.Item>
                <Descriptions.Item label="速度（m/s)"> 15, 17 20</Descriptions.Item>
                <Descriptions.Item label="位置">20, 20, 20</Descriptions.Item>
                <Descriptions.Item label="携带货物">是</Descriptions.Item>
                <Descriptions.Item label="剩余空间（kg）">5</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="订单统计信息" style={{ margin: "auto" }}>
                <Descriptions.Item label="订单总数">19</Descriptions.Item>
                <Descriptions.Item label="已完成订单数"> 15</Descriptions.Item>
                <Descriptions.Item label="正在派送订单数">4</Descriptions.Item>
                <Descriptions.Item label="平均等待时间">13min</Descriptions.Item>
            </Descriptions>
            <Divider />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
                style={{height:"250px", overflow:'auto'}}
            />
        </div>
    )
}