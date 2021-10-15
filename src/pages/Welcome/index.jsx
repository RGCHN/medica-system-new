import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Col, Row, Space } from 'antd';
import { Pie, Column, Gauge, Rose, Line} from '@ant-design/charts'
import { dayMap } from '@/pages/dataMap';
import styles from './index.less';

const { Title } = Typography;

/*mock数据*/
const genderData = [
  {
    type: '男',
    value: 4544,
  },
  {
    type: '女',
    value: 3321,
  }
];
const ageData = [
  {
    x: '0-10岁',
    y: Math.floor(Math.random() * 500)
  },
  {
    x: '11-20岁',
    y: Math.floor(Math.random() * 500)
  },
  {
    x: '21-30岁',
    y: Math.floor(Math.random() * 1000)
  },
  {
    x: '31-40岁',
    y: Math.floor(Math.random() * 1000) + 100
  },
  {
    x: '41-50岁',
    y: Math.floor(Math.random() * 1000) + 200
  },{
    x: '51-60岁',
    y: Math.floor(Math.random() * 1000) + 400
  },
  {
    x: '61-70岁',
    y: Math.floor(Math.random() * 1000) + 500
  },
  {
    x: '71-80岁',
    y: Math.floor(Math.random() * 1000) + 300
  },
  {
    x: '大于81岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
];
const distributeData = [
  {
    x: '超急性期',
    y: 4544,
    desc: '超急性期(0-6小时)'
  },
  {
    x: '急性期',
    y: 3321,
    desc: '急性期(6-24小时)',
  },
  {
    x: '亚急性期',
    y: 3113,
    desc: '亚急性期(24小时-2周)',
  },
  {
    x: '慢性期',
    y: 1231,
    desc:'慢性期(大于2周)'
  },
];
const now = dayjs().get('date');
const admittedData = [
  {
    x: dayjs().set('date', now - 7).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 6).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 5).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 4).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 3).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 2).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().set('date', now - 1).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
]

export default () => {
  const dateNow = useRef('');
  const day = useRef('');
  const [gender, setGender] = useState([]);
  const [ages, setAges] = useState([]);
  const [distribute, setDistribute] = useState([]);
  const [admitted, setAdmitted] = useState([]);
  const [cureRate, setCureRate] = useState( Math.random());

  useEffect(() => {
    /*设置日期*/
    const now  = dayjs();
    dateNow.current = now.format('YYYY-MM-DD HH:mm');
    day.current = dayMap[now.day()];
    setGender(genderData);
    setAges(ageData);
    setDistribute(distributeData);
    setAdmitted(admittedData);
  }, [])

  return (
    <PageContainer>
      <div className={styles.title}>
        <div className={styles.name}>Hi, 欢迎使用脑卒中AI辅助诊疗系统, 现在是北京时间{ dateNow.current }, 星期{day.current}</div>
        <br/>
        <div className={styles.desc}>轻松管理病患数据，AI辅助决策卒中梗死区域，敏捷数据看板</div>
      </div>
      <br />
      <div className={styles.cardWrapper}>
        <Row gutter={4}>
          <Col span={24}>
            <Card title="近七日入院患者数" hoverable  bordered={false}>
              <Line
                data={admitted}
                padding='auto'
                xField='x'
                yField='y'
                label={{}}
                point={{
                    size: 4,
                    shape: 'diamond',
                    style: {
                      fill: 'white',
                      stroke: '#5B8FF9',
                      lineWidth: 2
                    },
                  }}
                legend={false}
                state={{
                  active: {
                    style: {
                      shadowBlur: 4,
                      stroke: '#000',
                      fill: 'red',
                    },
                  },
                }}
                interactions={[{ type: 'tooltip', enable: false }]}
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={12} >
          <Col span={8}>
            <Card
              title="患者性别比例"
              bordered={false}
              hoverable
            >
              <Pie
                height={200}
                data={genderData}
                angleField='value'
                colorField='type'
                radius={0.9}
                label={{
                  type: 'inner',
                  offset: '-30%',
                  content: function content(_ref) {
                    const percent = _ref.percent;
                    return ''.concat((percent * 100).toFixed(0), '%');
                  },
                  style: {
                    fontSize: 14,
                    textAlign: 'center',
                  },
                }}
                interactions={[{ type: 'element-active' }]}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title='患者治愈率' bordered={false} hoverable
            >
              <Gauge
                height={200}
                percent={cureRate}
                range={{
                  ticks: [0,1],
                  color: ['l(0) 0:#B8E1FF 1:#3D76DD'],
                }}
                indicator={{
                  pointer: { style: { stroke: '#D0D0D0' } },
                  pin: { style: { stroke: '#D0D0D0' } },
                }}
                statistic={{
                  title: {
                    style: {
                      fontSize: '36px',
                      color: '#4B535E',
                    },
                  },
                  content: {
                    offsetY: -16,
                    style: {
                      fontSize: '24px',
                      lineHeight: '44px',
                      color: '#4B535E',
                    },
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title='患者卒中期' hoverable  bordered={false}>
              <Rose
                height={200}
                data={distribute}
                label={{
                  style: {
                    fill: 'black',
                    fontSize: 8
                  },
                  offset: -10
                }}
                xField='x'
                yField='y'
                seriesField='desc'
                radius={0.9}
                legend={false}
                interactions={[{ type: 'element-active' }]}
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={4}>
          <Col span={24}>
            <Card title="患者年龄分布" hoverable  bordered={false}>
              <Column
                data={ages}
                xField='x'
                yField='y'
                label={{
                  position: 'middle',
                  style: {
                    fill: '#ffffff',
                    opacity: 0.6
                  }
                }}
                xAxis={{
                  label: {
                    autoHide: true,
                    autoRotate: false,
                  }
                }}
                meta={{
                  x: { alias: '年龄范围'},
                  y: { alias: '人数'}
                }}
                theme='custom-theme'
                interactions={[{ type: 'tooltip', enable: false }]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
