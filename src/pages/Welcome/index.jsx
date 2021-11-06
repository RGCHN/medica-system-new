import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, message } from 'antd';
import { Pie, Column, Gauge, Rose, Line } from '@ant-design/charts';
import { dayMap } from '@/pages/dataMap';
import { getAnalyzeData } from '@/services/api';
import styles from './index.less';
import { useIntl } from 'umi';

/*mock数据*/
const mockGenderData = [
  {
    type: '男',
    value: 4544,
  },
  {
    type: '女',
    value: 3321,
  },
];
const mockAgeData = [
  {
    x: '0-10岁',
    y: Math.floor(Math.random() * 500),
  },
  {
    x: '11-20岁',
    y: Math.floor(Math.random() * 500),
  },
  {
    x: '21-30岁',
    y: Math.floor(Math.random() * 1000),
  },
  {
    x: '31-40岁',
    y: Math.floor(Math.random() * 1000) + 100,
  },
  {
    x: '41-50岁',
    y: Math.floor(Math.random() * 1000) + 200,
  },
  {
    x: '51-60岁',
    y: Math.floor(Math.random() * 1000) + 400,
  },
  {
    x: '61-70岁',
    y: Math.floor(Math.random() * 1000) + 500,
  },
  {
    x: '71-80岁',
    y: Math.floor(Math.random() * 1000) + 300,
  },
  {
    x: '大于81岁',
    y: Math.floor(Math.random() * 1000) + 200,
  },
];
const mockDistributeData = [
  {
    x: '超急性期',
    y: 4544,
    desc: '超急性期(0-6小时)',
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
    desc: '慢性期(大于2周)',
  },
];
const now = dayjs().get('date');
const mockAdmittedData = [
  {
    x: dayjs()
      .set('date', now - 7)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 6)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 5)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 4)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 3)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 2)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs()
      .set('date', now - 1)
      .format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
  {
    x: dayjs().format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 200),
  },
];

export default () => {
  const dateNow = useRef('');
  const day = useRef('');
  const [gender, setGender] = useState([]);
  const [ages, setAges] = useState([]);
  const [distribute, setDistribute] = useState([]);
  const [admitted, setAdmitted] = useState(mockAdmittedData);
  const [cureRate, setCureRate] = useState(0.68);
  const intl = useIntl();

  const fetchData = async () => {
    try {
      const res = await getAnalyzeData();
      if (res.data.status === 'success') {
        const genderData = Object.entries(res.data.data.sex_number).map((item) => {
          return {
            type: item[0] === 'manNumber' ? '男' : '女',
            value: Number(item[1]),
          };
        });
        const ageData = Object.entries(res.data.data.age).map((item) => {
          return {
            x: `${item[0]}岁`,
            y: item[1],
          };
        });
        const distributeData = Object.entries(res.data.data.phase).map((item) => {
          return {
            x: item[0],
            y: item[1],
            desc: item[0].slice(0, -1),
          };
        });

        setGender(genderData);
        setAges(ageData);
        setDistribute(distributeData);
        return;
      }
      message.error(res.data.msg);
      setGender(mockGenderData);
      setAges(mockAgeData);
      setDistribute(mockDistributeData);
    } catch (e) {
      const failMessage = intl.formatMessage({
        id: 'message.error.getAnalyzeData',
        defaultMessage: '获取统计数据失败',
      });
      message.error(failMessage);
      setGender(mockGenderData);
      setAges(mockAgeData);
      setDistribute(mockDistributeData);
    }
  };

  useEffect(() => {
    fetchData();
    const now = dayjs();
    dateNow.current = now.format('YYYY-MM-DD HH:mm');
    day.current = dayMap[now.day()];
  }, []);

  return (
    <PageContainer fixedHeader={true}>
      <div className={styles.title}>
        <div className={styles.name}>
          Hi, 欢迎使用脑卒中AI辅助诊疗系统, 现在是北京时间{dateNow.current}, 星期{day.current}
        </div>
        <br />
        <div className={styles.desc}>轻松管理病患数据，AI辅助决策卒中梗死区域，敏捷数据看板</div>
      </div>
      <br />
      <div className={styles.cardWrapper}>
        <Row gutter={4}>
          <Col span={24}>
            <Card title="近七日入院患者数" hoverable bordered={false}>
              <Line
                data={admitted}
                padding="auto"
                xField="x"
                yField="y"
                label={{}}
                point={{
                  size: 4,
                  shape: 'diamond',
                  style: {
                    fill: 'white',
                    stroke: '#5B8FF9',
                    lineWidth: 2,
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
        <Row gutter={12}>
          <Col span={8}>
            <Card title="患者性别比例" bordered={false} hoverable>
              <Pie
                height={200}
                data={gender}
                angleField="value"
                colorField="type"
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
            <Card title="患者治愈率" bordered={false} hoverable>
              <Gauge
                height={200}
                percent={cureRate}
                range={{
                  ticks: [0, 1],
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
            <Card title="患者卒中期" hoverable bordered={false}>
              <Rose
                height={200}
                data={distribute}
                label={{
                  style: {
                    fill: 'black',
                    fontSize: 8,
                  },
                  offset: -10,
                }}
                xField="x"
                yField="y"
                seriesField="desc"
                radius={1}
                legend={{ position: 'right' }}
                interactions={[{ type: 'element-active' }]}
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={4}>
          <Col span={24}>
            <Card title="患者年龄分布" hoverable bordered={false}>
              <Column
                data={ages}
                xField="x"
                yField="y"
                label={{
                  position: 'middle',
                  style: {
                    fill: '#ffffff',
                    opacity: 0.6,
                  },
                }}
                xAxis={{
                  label: {
                    autoHide: true,
                    autoRotate: false,
                  },
                }}
                meta={{
                  x: { alias: '年龄范围' },
                  y: { alias: '人数' },
                }}
                theme="custom-theme"
                interactions={[{ type: 'tooltip', enable: false }]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};
