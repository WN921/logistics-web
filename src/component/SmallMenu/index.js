import React, { Fragment } from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
      </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
);

export default function SmallMenu() {
    return (
        <Fragment>
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => {}}
            >
                开始仿真
            </Button>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    选择无人机 <DownOutlined />
                </a>
            </Dropdown>
        </Fragment>
    )
}