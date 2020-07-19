import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import Monitor from './page/Monitor';
import Playback from './page/Playback';
import {
	Switch,
	Route,
	Link
} from "react-router-dom";

const { Sider, Header, Footer } = Layout;


class App extends React.Component {
	state = {
		collapsed: false,
	};

	onCollapse = collapsed => {
		console.log(collapsed);
		this.setState({ collapsed });
	};
	render() {

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
						<Menu.Item key="1" icon={<PieChartOutlined />}>
							<Link to="/">实时监控</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							<Link to='/Plyaback'>轨迹回放</Link>
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0, textAlign: "center" }} >
						<h1>物流仿真平台</h1>
					</Header>
					<Switch>
						<Route path="/Plyaback">
							<Playback />
						</Route>
						<Route path="/">
							<Monitor />
						</Route>
					</Switch>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}


export default App;
