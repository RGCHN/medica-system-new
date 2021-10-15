import React, { useRef } from 'react';
import { Button, Descriptions, message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormDatePicker, ProFormTextArea, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

import ProCard from '@ant-design/pro-card';

const AddPatient = () => {
  const formRef = useRef();

  return (
    <DrawerForm
      title="新建病患记录"
      formRef={formRef}
      trigger={
        <Button type="primary"><PlusOutlined />新建</Button>}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
  }}>

      <ProCard
        title="个人信息"
        bordered
        headerBordered
        collapsible
        style={{
          marginBottom: 16,
          minWidth: 800,
          maxWidth: '100%',
        }}
      >
        <ProForm.Group>
          <ProFormText name="recordID" width="md" label="病案号" placeholder="请输入病案号"/>
          <ProFormText name="treatID" width="md" label="溶栓治疗编号" placeholder="请输入溶栓治疗编号"/>
          <ProFormText name="name" width="md" label="患者姓名" placeholder="请输入患者姓名"/>
          <ProFormText name="sex" width="md" label="患者性别" placeholder="请输入患者性别"/>
          <ProFormDigit  name="age"  precision={0}width="md" label="患者年龄" placeholder="请输入患者年龄"/>
          <ProFormDatePicker name="updateTime" width="md" label="就诊时间"/>
          <ProFormSelect name="diabetes" width="md" label="糖尿病" valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormSelect name="fibrillation" width="md" label="房颤" valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormSelect name="highBloodPressure" width="md" label="高血压" valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormTextArea name="remark" width="lg" label="备注" placeholder="备注"/>
        </ProForm.Group>
      </ProCard>
      <ProCard
        title="疾病信息"
        bordered
        headerBordered
        collapsible
        style={{
          marginBottom: 16,
          minWidth: 800,
          maxWidth: '100%',
        }}
      >
        <ProForm.Group>
          <ProFormTextArea name="info" width="lg" label="主诉" placeholder="请输入主诉"/>
          <ProFormSelect name="PrevHemorrhage" width="md" label="既往脑出血" valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormSelect name="PrevStroke" width="md" label="既往卒中" valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormSelect name="Warfarin" width="md" label="服用华法林"valueEnum={{
            1: '是',
            0: '否',
          }} />
          <ProFormDigit  name="T" width="md" label="T(℃)" />
          <ProFormDigit  name="P" width="md" label="P(min)" />
          <ProFormDigit  name="R" width="md" label="R(min)" />
          <ProFormDigit  name="SystolicPressure" width="md" label="急诊收缩压(mmHg)" />
        </ProForm.Group>
      </ProCard>
  </DrawerForm>)
}

export default AddPatient;
