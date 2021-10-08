import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Descriptions, Card } from 'antd';
import { stateMap } from '../dataMap'


const MOCK_PATIENT = {
  id:'1111',
  doctorName:'张伟华医师',
  patientName: '李兵',
  sex:'男',
  age: 32,
  result: '出血性脑梗塞',
}

export default () => {

  const [patient, setPatient] = useState(MOCK_PATIENT);

  useEffect(() => {
  }, [])

  const changeMode = () => {

  }


  return (
    <PageHeaderWrapper>
      <div className='info-viewer'>
        <Card>
          <div className="button-container">
            <Button type="primary" className='edit-button' onClick={ () => changeMode('edit')}>编辑</Button>
          </div>
          <Descriptions title='个人信息' bordered column={3} className='basic-info-viewer'>
            <Descriptions.Item label="就诊卡号/医保号">{patient.recordID}</Descriptions.Item>
            <Descriptions.Item label="姓名">{patient.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{patient.sex.toString()==='0'? '男': '女'}</Descriptions.Item>
            <Descriptions.Item label="年龄（岁）">{patient.age}</Descriptions.Item>
            <Descriptions.Item label="病人状态">{stateMap[patient.state]}</Descriptions.Item>
            <Descriptions.Item label="就诊时间">{patient.updateTime}</Descriptions.Item>
            <Descriptions.Item label="脑卒中分类">{patient.cva === "in" ? "缺血性脑梗塞" : "出血性脑梗塞"}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="疾病信息" column={6} className="disease-info-viewer">
            <Descriptions.Item label="病症描述" span={4}>
              {patient.info}
            </Descriptions.Item>
            <Descriptions.Item label="诊疗结果" span={2}>
              {patient.result}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title='疾病信息'>

        </Card>
      </div>
    </PageHeaderWrapper>
  );
};
