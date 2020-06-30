import React , { useEffect }from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { MapContainer } from './style';

function Map(props) {

	
	
	useEffect(() => {
		AMapLoader.load({
			"key": "c427a19b640ac431a69b7198e79af901",   // 申请好的Web端开发者Key，首次调用 load 时必填
			"version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			"plugins": []  //插件列表
		}).then((AMap) => {
			const map = new AMap.Map('container', {
				resizeEnable: true,
				center: [116.397428, 39.90923],
				zoom: 17
			});
			

		}).catch(e => {
			console.log(e);
		})
	});
	return <MapContainer id='container' />
}


export default Map;