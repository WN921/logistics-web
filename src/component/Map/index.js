import React, { useState, useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { MapContainer } from './style';
import UAVpng from '../../asserts/无人机.png';
import startpng from '../../asserts/起点.png';
import endpng from '../../asserts/终点.png';



function Map(props) {
	let { UavList, OrderList } = props;
	UavList = UavList ? UavList.toJS() : [];
	OrderList = OrderList ? OrderList.toJS() : [];

	//保存AMap方法、地图实例、无人机点标记实例、无人机轨迹线实例
	let [AmapState, setAmapState] = useState(null);
	let [mapState, setMapState] = useState(null);
	let [UavPointstState, setUavPointstState] = useState(null);
	let [passedLinesState, setPassedlinesState] = useState(null);

	//订单起点数组、订单终点数组
	let [startPointsState, setStartPointsState] = useState(null);
	let [endPointsState, setEndPointsState] = useState(null)


	//生成地图并存放在state中
	useEffect(() => {
		AMapLoader.load({
			"key": "c427a19b640ac431a69b7198e79af901",   // 申请好的Web端开发者Key，首次调用 load 时必填
			"version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			"plugins": ['AMap.MoveAnimation']  //插件列表
		}).then((AMap) => {
			const map = new AMap.Map('container', {
				resizeEnable: true,
				center: [108.7652, 34.0328],
				zoom: 15
			});
			setAmapState(AMap);
			setMapState(map);
		}).catch(e => {
			console.log(e);
		})
	}, []);



	//生成无人机点标记、轨迹线
	useEffect(() => {
		//加载地图完成，什么也不做
		if (UavList.length === 0) {
			return;
		}
		//第一次获取到数据，做一些初始化工作
		if (UavList.length !== 0 && UavPointstState === null && AmapState !== null) {
			//创建无人机标记点
			let points = new Array(UavList.length);
			const icon = new AmapState.Icon({
				// 图标尺寸
				size: new AmapState.Size(20, 20),
				// 图标的取图地址
				image: UAVpng,
				// 图标所用图片大小
				imageSize: new AmapState.Size(20, 20),
			});
			for (let i = 0; i < UavList.length; i++) {
				points[i] = new AmapState.Marker({
					map: mapState,
					position: [UavList[i].longitude, UavList[i].latitude],
					icon: icon,
					offset: new AmapState.Pixel(-10,-10),
				});

			}

			//创建无人机创建对应的轨迹线
			let passedLines = points.map(item => {
				return new AmapState.Polyline({
					map: mapState,
					strokeColor: "#AF5",  //线颜色
					strokeWeight: 6,      //线宽
				});
			})

			//为每一条无人机轨迹线创建一个经纬度数组
			let passedLinesArray = passedLines.map(item => []);


			//设置每个无人机标点的移动事件的回调函数，把移动的坐标写到轨迹线上
			for (let i = 0; i < points.length; i++) {
				points[i].on('moving', function (e) {
					passedLinesArray[i] = passedLinesArray[i].concat(e.passedPath);
					passedLines[i].setPath(passedLinesArray[i]);
				});
			}

			setUavPointstState(points);
			setPassedlinesState(passedLines);
		}
	})

	//无人机标记移动
	useEffect(() => {
		//第二次及以后获取到数据，移动标记点
		if (UavList.length !== 0 && UavPointstState !== null) {
			UavPointstState.forEach((item, index) => {
				item.moveTo(
					new AmapState.LngLat(UavList[index].longitude, UavList[index].latitude),
					{
						duration: 1000,

					}
				)
			})
		}
	})

	//根据订单生成终点、起点、路径
	useEffect(() => {
		//如果尚未获取到数据则什么都不做
		if(OrderList.length === 0){
			return;
		}
		if(OrderList.length !== 0){
			//创建订单起点数组、订单终点数组

			const startPointIcon = new AmapState.Icon({
				size: new AmapState.Size(20, 20),
				image: startpng,
				imageSize: new AmapState.Size(20, 20),
			});
			const endPointIcon = new AmapState.Icon({
				size: new AmapState.Size(20, 20),
				image: endpng,
				imageSize: new AmapState.Size(20, 20),
			});
			let startPoints = OrderList.map(item => {
				return new AmapState.Marker({
					position: new AmapState.LngLat(item.orderOriginLongitude, item.orderOriginLatitude), 
					icon: startPointIcon,
					offset: new AmapState.Pixel(-10,-20),

				});
			})
			let endPoints = OrderList.map(item => {
				return new AmapState.Marker({
					position: new AmapState.LngLat(item.orderDestinationLongitude, item.orderDestinationLatitude), 
					icon: endPointIcon,
					offset: new AmapState.Pixel(-10,-20),

				});
			})

			//创建订单路径数组
			let orderLines = OrderList.map(item => {
				let path = [
					new AmapState.LngLat(item.orderOriginLongitude, item.orderOriginLatitude),
					new AmapState.LngLat(item.orderDestinationLongitude, item.orderDestinationLatitude)
				];
				return new AmapState.Polyline({
					path: path,  
					borderWeight: 2, // 线条宽度，默认为 1
					strokeColor: 'grey', // 线条颜色
					lineJoin: 'round' // 折线拐点连接处样式
				});
			})


			for(let i = 0; i < OrderList.length; i++){
				if(OrderList[i].orderState === '完成'){
					continue;
				}
				if(OrderList[i].orderState === '等待中'){
					continue;
				}
				mapState.add(startPoints[i]);
				mapState.add(endPoints[i]);
				mapState.add(orderLines[i]);
			}

			return () => {
				for(let i = 0; i < OrderList.length; i++){
					if(OrderList[i].orderState === '完成'){
						continue;
					}
					if(OrderList[i].orderState === '等待中'){
						continue;
					}
					mapState.remove(startPoints[i]);
					mapState.remove(endPoints[i]);
					mapState.remove(orderLines[i]);
				}
			}
		}
	})

	return <MapContainer id='container' />
}


export default React.memo(Map);