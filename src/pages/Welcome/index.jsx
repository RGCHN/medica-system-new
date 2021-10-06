import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Col, Row } from 'antd';
import { Pie, Column } from '@ant-design/charts'

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
    type: '0-10岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '11-20岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '21-30岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '31-40岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '41-50岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },{
    type: '51-60岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '61-70岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '71-80岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
  {
    type: '大于81岁',
    sales: Math.floor(Math.random() * 1000) + 200
  },
]

export default () => {
  const dateNow = useRef(dayjs().format('YYYY-MM-DD HH:mm'));
  const [gender, setGender] = useState(null);
  const [ages, setAges] = useState(null);


  useEffect(() => {
    setGender(genderData);
    setAges(ageData);
  }, [])


  return (
    <PageContainer>
      <Card>
        <Title level={5}>现在是 北京时间  {dateNow.current}</Title>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="患者性别分布" bordered={false}>
                <Pie
                  autoFit={true}
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
              <Card title="患者年龄分布" bordered={false}>
                <Column
                  data={ageData}
                  xField='type'
                  yField='sales'
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
                    type: {alias: '年龄范围'},
                    sales: { alias: '人数'}
                  }}

                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>,
      </Card>
    </PageContainer>
  );
};
