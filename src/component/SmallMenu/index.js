import React, { Fragment, useState} from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';


export default function SmallMenu(props) {
    let { UavList, SelectedUavId } = props;
    UavList = UavList ? UavList.toJS() : [];

    const { getUavListDispatch, getOrderListDispatch, changeSelectedUavIdDispatch } = props;

    let [IntervalIdState, setIntervalIdState] = useState(null);

    const clickDropdown = ({ key }) => {
        changeSelectedUavIdDispatch(parseInt(key))
    }

    const menu = (
        <Menu onClick={clickDropdown}>
            {UavList.map((item, index) => {
                if (index >= 0) {
                    return (
                        <Menu.Item key={item.nodeID}>
                            <a target="_blank">
                                无人机{item.nodeID}号
                            </a>
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    )

    return (
        <Fragment>
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => {
                    setIntervalIdState(
                        setInterval(() => {
                            getUavListDispatch();
                            getOrderListDispatch();
                        }, 2000)
                    );
                }}
            >
                开始仿真
            </Button>
            <Button
                onClick={() => {
                    clearInterval(IntervalIdState);
                }}
            >
                暂停仿真
            </Button>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    选择无人机 <DownOutlined />
                </a>
            </Dropdown>
        </Fragment>
    )
}
