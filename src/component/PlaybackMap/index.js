import React, { useState, useEffect, useRef } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { MapContainer } from "./style";
import UAVpng from "../../asserts/无人机.png";
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";
import { color16 } from "../../api/utils";
import { mapConfig } from '../../api/config';

function PlaybackMap(props) {
	let { SelectedRecord } = props;
	SelectedRecord = SelectedRecord ? SelectedRecord.toJS() : [];

	//AMap类
	let [AmapState, setAmapState] = useState(null);
	//地图实例
	let [mapState, setMapState] = useState(null);

	//生成地图并存放在state中，只在页面加载后运行一次
	useEffect(() => {
		AMapLoader.load({
			key: "c427a19b640ac431a69b7198e79af901", // 申请好的Web端开发者Key，首次调用 load 时必填
			version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: ["AMap.MoveAnimation"], //插件列表
		})
			.then((AMap) => {
				const map = new AMap.Map("container", {
					resizeEnable: true,
					center: mapConfig.mapCenter,
					zoom: mapConfig.zoom,
				});
				setAmapState(AMap);
				setMapState(map);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	//无人机节点、无人机轨迹线
	useEffect(() => {
		//加载地图完成，什么也不做
		if (SelectedRecord.length === 0 ||  AmapState === null ||mapState === null) {
			return;
		}

		//创建对应无人机的经纬度数组
		let lolaArray = SelectedRecord.map((item) => {
			return item.map((elem) => {
				return [elem.longitude, elem.latitude];
			})
		})

		//创建无人机标记点
		let points = new Array(SelectedRecord.length);
		const icon = new AmapState.Icon({
			// 图标尺寸
			size: new AmapState.Size(20, 20),
			// 图标的取图地址
			image: UAVpng,
			// 图标所用图片大小
			imageSize: new AmapState.Size(20, 20),
		});

		let uavs = SelectedRecord.map((item, index) => {
			return new AmapState.Marker({
				map: mapState,
				position: lolaArray[index][0],
				icon: icon,
				offset: new AmapState.Pixel(-10, -10),
			});
		})

		
		let passedPolylines = SelectedRecord.map(() => {
			return new AmapState.Polyline({
				map: mapState,
				strokeColor: color16(),  //线颜色
				strokeWeight: 6,      //线宽
			});
		})

		
		for (let i = 0; i < uavs.length; i++) {
			uavs[i].on('moving', function (e) {
				passedPolylines[i].setPath(e.passedPath);
			});
		}

		window.startAnimation = function startAnimation() {
			uavs.forEach((item, index) => {
				item.moveAlong(lolaArray[index], {
					// 每一段的时长
					duration: 500,
					// JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
					autoRotation: true,
				});
			});

		};

		window.pauseAnimation = function () {
			uavs.forEach((item,) => {
				item.pauseMove();
			})
		};

		window.resumeAnimation = function () {
			uavs.forEach((item,) => {
				item.resumeMove();
			})
		};

		window.stopAnimation = function () {
			uavs.forEach((item,) => {
				item.stopMove();
			})
		};
		return () => {
			window.stopAnimation();
			//解除事件绑定
			for (let i = 0; i < uavs.length; i++) {
				uavs[i].clearEvents('moving');
			}
			//清除所有覆盖物
			mapState.clearMap();
			console.log('清除成功')
		}

	})

	return <MapContainer id="container" />;
}

export default React.memo(PlaybackMap);
