import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { Button, Descriptions } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddPatient from '@/components/AddPatient';


const MOCK_PATIENT = {
  recordID:'1111', // 病案号
  name: '张忠尧',
  sex: 0,
  age: 77,
  treatID: '2892', // 溶栓治疗编号
  remark: '入MT临床试验', // 个人信息备注
  diseaseRemark: '疾病信息备注', // 疾病信息备注
  reason: '突发言语不能伴右侧肢体活动障碍3小时余', // 主诉
  info: '行溶栓治疗', // 诊断结论
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
    <ProCard bordered headerBordered gutter={16} extra={ <AddPatient title='修改病人信息' trigger={<Button type="primary"><EditOutlined />编辑</Button>}/>}>
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
          <Descriptions.Item label="个人信息备注">{patient.remark}</Descriptions.Item>
        </Descriptions>

        <Descriptions layout='vertical' bordered>
          <Descriptions.Item label="糖尿病">{patient.diabetes? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="房颤">{patient.fibrillation? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="高血压">{patient.highBloodPressure? '是' : '否'}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard
        title="疾病信息"
        type="inner"
        bordered
      >
        <Descriptions column={1}>
          <Descriptions.Item label="主诉" span={4}>{patient.reason}</Descriptions.Item>
          <Descriptions.Item label="诊断结论" span={4}>{patient.info}</Descriptions.Item>
          <Descriptions.Item label="既往脑出血">{patient.PrevHemorrhage? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="既往卒中">{patient.PrevStroke? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label="服用华法林">{patient.PrevStroke? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label='急诊收缩压(mmHg)'>{patient.SystolicPressure}</Descriptions.Item>
          <Descriptions.Item label='疾病信息备注'>{patient.diseaseRemark}</Descriptions.Item>
        </Descriptions>
        <Descriptions layout='vertical' bordered>
          <Descriptions.Item label='T(℃)'>{patient.T}</Descriptions.Item>
          <Descriptions.Item label='P（min）'>{patient.P}</Descriptions.Item>
          <Descriptions.Item label='R（min）'>{patient.R}</Descriptions.Item>
        </Descriptions>
      </ProCard>
    </ProCard>
  );
};
