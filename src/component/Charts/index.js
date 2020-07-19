import React, { useEffect } from 'react';
import { ChartsContainer } from './style';
import echarts from 'echarts';
import { Divider } from 'antd';

export default function Charts(props) {
    let { UavList, OrderList } = props;
    UavList = UavList ? UavList.toJS() : [];
    OrderList = OrderList ? OrderList.toJS() : [];

    const { SelectedUavId } = props;

    let FinishedOrder = 0;
    let DispatchingOrder = 0;
    let WaitingOrder = 0;
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
    }


    useEffect(() => {
        const radarChart = echarts.init(document.getElementById('radar'));
        const radarOption = {
            title: {
                text: '无人机能力',
                
            },

            legend: {
                data: ['上限', '现状'],
                left : "2%",
                bottom : "2%"
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '移动-水平移速', max: 10 },
                    { name: '感知-范围', max: 100 },
                    { name: '装载-重量', max: 50 },
                    { name: '计算-速度', max: 100 },
                    { name: '通信-范围', max: 150 },
                    { name: '巡航-电量%', max: 100 }
                ]
            },
            series: [{
                name: '上限 vs 现状',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: [
                            UavList.length !== 0 ? UavList[SelectedUavId].moveAbilityHorizontalVelocity : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].senseAbilityDistance : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].loadAbilityMaxWeight : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].computeAbilitySpeed : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].communicateAbilityDistance : 0,
                            100
                        ],
                        name: '上限'
                    },
                    {
                        value: [
                            UavList.length !== 0 ? UavList[SelectedUavId].moveAbilityHorizontalVelocity : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].senseAbilityDistance : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].loadAbilityActualLoadWeight : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].computeAbilitySpeed : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].communicateAbilityDistance : 0,
                            UavList.length !== 0 ? UavList[SelectedUavId].cruisingAbilityPowerMarginPercentage : 0
                        ],
                        name: '现状'
                    }
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        radarChart.setOption(radarOption);






        const pieChart = echarts.init(document.getElementById('pie'));
        const pieOption = {
            title: {
                text: '订单执行情况',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['已完成订单', '派送中订单', '等待中订单']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: FinishedOrder, name: '已完成订单' },
                        { value: DispatchingOrder, name: '派送中订单' },
                        { value: WaitingOrder, name: '等待中订单' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        pieChart.setOption(pieOption);


    })
    return (
        <ChartsContainer>
            <div class='chartItem' id='radar' />
            <Divider />
            <div class='chartItem' id='pie' />
        </ChartsContainer>
    )
}