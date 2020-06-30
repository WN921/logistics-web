import React from 'react';
import './App.css';
import { Layout, Menu, Row, Col } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import Map from './component/Map';
import InformationList from './component/InformationList';
import Charts from './component/Charts';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SamllMenu from './component/SmallMenu';
import SmallMenu from './component/SmallMenu';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
							实时监控
            			</Menu.Item>
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							轨迹回放
            			</Menu.Item>
					</Menu>
				</Sider>

				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0, textAlign: "center" }} >
						<h1>物流仿真平台</h1>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Row>
							<Col span={12}>
								<div className="site-layout-background col" >
									<Map />
								</div>
							</Col>
							<Col span={6}>
								<div className="site-layout-background col" >
									<InformationList />
								</div>
							</Col>
							<Col span={6}>
								<div className="site-layout-background col" >
									<Charts />
								</div>
							</Col>
						</Row>
						<Row>
							<SmallMenu />
						</Row>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}


export default App;
