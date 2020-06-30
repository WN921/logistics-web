import React, { useEffect } from 'react';
import { ChartsContainer } from './style';
import echarts from 'echarts';
import { Divider } from 'antd';

export default function Charts() {
    useEffect(() => {
        const myChart = echarts.init(document.getElementById('radar1'));
        const option = {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
                    { name: '销售（sales）', max: 6500 },
                    { name: '管理（Administration）', max: 16000 },
                    { name: '信息技术（Information Techology）', max: 30000 },
                    { name: '客服（Customer Support）', max: 38000 },
                    { name: '研发（Development）', max: 52000 },
                    { name: '市场（Marketing）', max: 25000 }
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
                    }
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        const myChart2 = echarts.init(document.getElementById('radar2'));
        const option2 = {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
                    { name: '销售（sales）', max: 6500 },
                    { name: '管理（Administration）', max: 16000 },
                    { name: '信息技术（Information Techology）', max: 30000 },
                    { name: '客服（Customer Support）', max: 38000 },
                    { name: '研发（Development）', max: 52000 },
                    { name: '市场（Marketing）', max: 25000 }
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
                    }
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);


    })
    return (
        <ChartsContainer>
            <div class='chartItem' id='radar1' />
            <Divider />
            <div class='chartItem' id='radar2' />
        </ChartsContainer>
    )
}