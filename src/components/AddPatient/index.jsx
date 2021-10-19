import React, { useRef, useCallback } from 'react';
import { message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormDatePicker, ProFormTextArea, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { addPatient } from '@/services/api';

const AddPatient = (props) => {
  const { title = '', trigger, defaultData = {} } = props;
  const formRef = useRef();
  const intl = useIntl();

  const handleFinish = useCallback(async values => {
    const defaultErrorMessage = intl.formatMessage({
      id: 'errors.message.addPatient',
      defaultMessage: '提交信息错误！',
    });
    try {
      console.log(values);
      const res = await addPatient({
        ...values
      });
      if (res.data.status === 'success') {

      } else {
        message.error(defaultErrorMessage)
      }
    }
     catch (e) {
      message.error(defaultErrorMessage)
    }
    return true;
  }, [])

  return (
    <DrawerForm
      title={title}
      formRef={formRef}
      trigger={trigger}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        maskClosable: false
      }}
      onFinish={handleFinish}>
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
          <ProFormText name="recordID" width="md" label="病案号" placeholder="请输入病案号" rules={[{ required: true }]} />
          <ProFormText name="treatID" width="md" label="溶栓治疗编号" placeholder="请输入溶栓治疗编号"/>
          <ProFormText name="name" width="md" label="患者姓名" placeholder="请输入患者姓名" rules={[{ required: true }]}/>
          <ProFormSelect name="sex" width="md" label="患者性别" placeholder="请输入患者性别" valueEnum={{
            1: '女',
            0: '男',
          }}/>
          <ProFormDigit  name="age"  precision={0} width="md" label="患者年龄" placeholder="请输入患者年龄"/>
          <ProFormDatePicker name="updateTime" width="md" label="就诊时间" rules={[{ required: true }]}/>
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
          <ProFormTextArea name="remark" width="lg" label="个人信息备注" placeholder="请输入个人信息备注"/>
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
          <ProFormTextArea name="reason" width="lg" label="主诉" placeholder="请输入主诉" rules={[{ required: true }]}/>
          <ProFormTextArea name="info" width="lg" label="诊断结论" placeholder="请输入诊断结论" />
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
          <ProFormTextArea name="diseaseRemark" width="lg" label="疾病信息备注" placeholder="请输入疾病信息备注" />
        </ProForm.Group>
      </ProCard>
  </DrawerForm>)
}

export default AddPatient;
