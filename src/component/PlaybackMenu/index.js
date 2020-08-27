import React, { Fragment, useState, useEffect } from "react";
import { List, Radio, Divider, Button } from "antd";
import { LiWrapper, ButtonWrapper } from "./style";

export default function PlaybackMenu(props) {
	const { HistoryList } = props;
	const { getHiststoryListDispatch, getSelecteRecordDispatch } = props;

	const [checkedValue, setCheckedValue] = useState(null);

	const changeValue = (e) => {
		setCheckedValue(e.target.value);
		getSelecteRecordDispatch(e.target.value)
	};
	useEffect(() => {
		getHiststoryListDispatch()
	}, []);
	const start = () => {
		window.startAnimation();
	}
	const pause = () => {
		window.pauseAnimation()
	}
	const resume = () => {
		window.resumeAnimation()
	}
	const stop = () => {
		window.stopAnimation()
	}
	return (
		<Fragment>
			<Radio.Group onChange={changeValue} value={checkedValue} >
				<List >
					<h1>可选历史记录</h1>
					<LiWrapper>
						{HistoryList ? HistoryList.map((item) => (
							<List.Item>
								<Radio value={item} />
								{item}
							</List.Item>
						)) : null}
					</LiWrapper>
				</List>
			</Radio.Group>
			<Divider />
			<h1>回放控制</h1>
			<ButtonWrapper>
				<Button onClick={start}  type="primary" block>开始</Button>
				<Button onClick={pause} block>暂停</Button>
				<Button onClick={resume} type="dashed" block>继续</Button>
				<Button onClick={stop} type="primary" danger block>终止</Button>
			</ButtonWrapper>
		</Fragment>
	);
}
