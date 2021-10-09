import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Typography, Descriptions, List } from 'antd';
import { stateMap } from '../dataMap'
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';


const MOCK_PATIENT = {
  recordID:'1111', // 病案号
  name: '张忠尧',
  sex: 0,
  age: 77,
  treatID: '2892', // 溶栓治疗编号
  remark: '入MT临床试验', // 个人信息备注
  info: '突发言语不能伴右侧肢体活动障碍3小时余', // 主诉
  updateTime:  dayjs().format('YYYY-MM-DD'), // 就诊时间
  strokeTime: dayjs().format('YYYY-MM-DD'), // 发病日期
  PrevHemorrhage: false, // 既往脑出血
  highBloodPressure: true, // 高血压
  diabetes: true, // 糖尿病
  fibrillation: false, // 房颤
  PrevStroke: false, //既往卒中
  Warfarin: false, // 是否服用华法林
  T: 37.2, // 体温
  P: 77,
  R: 12,
  SystolicPressure: 123, // 急诊收缩压
}

export default () => {
  const [patient, setPatient] = useState(MOCK_PATIENT);

  useEffect(() => {
  }, [])

  const editInformation = () => {

  }

  return (
    <ProCard bordered headerBordered gutter={16}>
      <ProCard
        title="个人档案"
        type="inner"
        bordered
      >
        <Descriptions column={1}>
          <Descriptions.Item label="病案号">{patient.recordID}</Descriptions.Item>
          <Descriptions.Item label="溶栓治疗编号">{patient.treatID}</Descriptions.Item>
          <Descriptions.Item label="姓名">{patient.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{patient.sex.toString()==='0'? '男': '女'}</Descriptions.Item>
          <Descriptions.Item label="年龄（岁）">{patient.age}</Descriptions.Item>
          <Descriptions.Item label="就诊时间">{patient.updateTime}</Descriptions.Item>
          <Descriptions.Item label="备注">{patient.remark}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard
        title="疾病信息"
        type="inner"
        bordered
        actions={[
          <EditOutlined key="edit" onClick={editInformation}/>]
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="主诉" span={4}>{patient.info}</Descriptions.Item>
          <Descriptions.Item label="既往脑出血">{patient.PrevHemorrhage? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="既往卒中">{patient.PrevStroke? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="服用华法林">{patient.PrevStroke? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label='T(℃)'>{patient.T}</Descriptions.Item>
          <Descriptions.Item label='P（min）'>{patient.P}</Descriptions.Item>
          <Descriptions.Item label='R（min）'>{patient.R}</Descriptions.Item>
          <Descriptions.Item label='急诊收缩压(mmHg)'>{patient.SystolicPressure}</Descriptions.Item>
        </Descriptions>

      </ProCard>
    </ProCard>
  );
};
