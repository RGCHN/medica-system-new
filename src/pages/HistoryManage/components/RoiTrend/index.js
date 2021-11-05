import React, { Component } from 'react';
import { Line } from '@ant-design/charts';
import { Empty } from 'antd';
import './index.scss';

const data = [
  { time: '2020-05-12', size: 20.78 },
  { time: '2020-05-20', size: 16.33 },
  { time: '2020-06-12', size: 12.78 },
  { time: '2020-06-18', size: 12.55 },
  { time: '2020-06-22', size: 12.34 },
  { time: '2020-07-01', size: 12.05 },
  { time: '2020-07-10', size: 11.89 },
];
const defaultConfig = {
  padding: 'auto',
  forceFit: true,
  title: {
    visible: true,
    text: '梗死区域面积变化趋势',
  },
  xField: 'time',
  yField: 'size',
};

export default class RoiTrend extends Component {
  state = {
    trendList: data,
  };

  /*componentDidMount() {
    const id = this.context;
    this.modelHttp.post('getSizeTrend',{patientID: id}).then(res =>{
      const trendList = get(res, 'data.data.sizeTrend', []);
      this.setState({
        trendList
      })
    }, err => {
      message.error('网络错误！请稍后重试！')
    })

  }*/

  render() {
    const { trendList } = this.state;
    const config = { ...defaultConfig, data: trendList };
    return trendList.length === 0 ? (
      <Empty description="暂无数据" />
    ) : (
      <div className="trend-container">
        <Line {...config} />
      </div>
    );
  }
}
