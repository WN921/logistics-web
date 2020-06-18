import React from 'react';
import './App.css';
import { Layout, Menu, Row, Col, Descriptions, Divider   } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Map } from 'react-amap';

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
							物流平台实时监控
            </Menu.Item>
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							实时轨迹
            </Menu.Item>
						<SubMenu key="sub1" icon={<UserOutlined />} title="User">
							<Menu.Item key="3">Tom</Menu.Item>
							<Menu.Item key="4">Bill</Menu.Item>
							<Menu.Item key="5">Alex</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
							<Menu.Item key="6">Team 1</Menu.Item>
							<Menu.Item key="8">Team 2</Menu.Item>
						</SubMenu>
						<Menu.Item key="9" icon={<FileOutlined />} />
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
									<div id="container">
										<Map amapkey={"c427a19b640ac431a69b7198e79af901"} />
									</div>
								</div>
							</Col>
							<Col span={12}>
								<div className="site-layout-background col">
									<Descriptions title="指定无人机信息" style={{margin:"auto"}}>
										<Descriptions.Item label="编号">19</Descriptions.Item>
										<Descriptions.Item label="速度（m/s)"> 15, 17 20</Descriptions.Item>
										<Descriptions.Item label="位置">20, 20, 20</Descriptions.Item>
										<Descriptions.Item label="携带货物">是</Descriptions.Item>
										<Descriptions.Item label="剩余空间（kg）">5</Descriptions.Item>
									</Descriptions>
									<Divider />
									<Descriptions title="订单统计信息" style={{margin:"auto"}}>
										<Descriptions.Item label="订单总数">19</Descriptions.Item>
										<Descriptions.Item label="已完成订单数"> 15</Descriptions.Item>
										<Descriptions.Item label="正在派送订单数">4</Descriptions.Item>
										<Descriptions.Item label="平均等待时间">13min</Descriptions.Item>
									</Descriptions>
									<Divider />
									<Descriptions title="指定订单信息" style={{margin:"auto"}}>
										<Descriptions.Item label="id">1</Descriptions.Item>
										<Descriptions.Item label="时间戳">Thu Jun 18 2020 16:39:12 GMT+0800</Descriptions.Item>
										<Descriptions.Item label="起点">20, 20, 20</Descriptions.Item>
										<Descriptions.Item label="终点">10, 10, 10</Descriptions.Item>
										<Descriptions.Item label="重量（kg）">5</Descriptions.Item>
									</Descriptions>
								</div>
							</Col>
						</Row>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}


export default App;
