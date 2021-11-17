import React, { useRef, useCallback } from 'react';
import { message } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { useIntl } from 'umi';
import { addPatient } from '@/services/api';

const DEFAULT_PATIENT = {
  recordID: '', // 病案号
  name: '',
  sex: 0,
  state: '', // 脑损伤阶段
  treatID: '', // 溶栓治疗编号
  remark: '', // 个人信息备注
  diseaseRemark: '', // 疾病信息备注
  reason: '', // 主诉
  info: '', // 诊断结论
  createTime: new Date().getTime(), // 就诊时间
  strokeTime: new Date().getTime(), // 发病日期
  prevHemorrhage: 0, // 既往脑出血
  highBloodPressure: 0, // 高血压
  diabetes: 0, // 糖尿病
  fibrillation: 0, // 房颤
  prevStroke: 0, //既往卒中
  warfarin: 0, // 是 否服用华法林
};

const AddPatient = (props) => {
  const { title = '', trigger, defaultData = DEFAULT_PATIENT, finishCallback = () => {} } = props;
  const formRef = useRef();
  const intl = useIntl();

  const handleFinish = useCallback(async (values) => {
    const defaultErrorMessage = intl.formatMessage({
      id: 'message.error.addPatient',
      defaultMessage: '提交信息错误！',
    });
    const defaultSuccessMessage = intl.formatMessage({
      id: 'message.success.addPatient',
      defaultMessage: '提交信息成功！',
    });
    try {
      const res = await addPatient({
        ...values,
      });
      if (res.data.status === 'success') {
        message.success(defaultSuccessMessage);
        typeof finishCallback === 'function' && finishCallback();
      } else {
        message.error(defaultErrorMessage);
      }
    } catch (e) {
      message.error(defaultErrorMessage);
    }
    return true;
  }, []);

  return (
    <DrawerForm
      title={title}
      formRef={formRef}
      trigger={trigger}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        maskClosable: false,
      }}
      initialValues={{
        ...defaultData,
      }}
      onFinish={handleFinish}
    >
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
          <ProFormText
            name="recordID"
            width="md"
            label="病案号"
            placeholder="请输入病案号"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="treatID"
            width="md"
            label="溶栓治疗编号"
            placeholder="请输入溶栓治疗编号"
          />
          <ProFormText
            name="name"
            width="md"
            label="患者姓名"
            placeholder="请输入患者姓名"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name="sex"
            width="md"
            label="患者性别"
            placeholder="请输入患者性别"
            options={[
              { label: '男', value: 0 },
              { label: '女', value: 1 },
            ]}
          />
          <ProFormDigit
            name="age"
            precision={0}
            width="md"
            label="患者年龄"
            placeholder="请输入患者年龄"
          />
          <ProFormDatePicker
            name="createTime"
            width="md"
            label="就诊时间"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker
            name="strokeTime"
            width="md"
            label="发病时间"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name="diabetes"
            width="md"
            label="糖尿病"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormSelect
            name="fibrillation"
            width="md"
            label="房颤"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormSelect
            name="highBloodPressure"
            width="md"
            label="高血压"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormTextArea
            name="remark"
            width="lg"
            label="个人信息备注"
            placeholder="请输入个人信息备注"
          />
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
          <ProFormTextArea
            name="reason"
            width="lg"
            label="主诉"
            placeholder="请输入主诉"
            rules={[{ required: true }]}
          />
          <ProFormTextArea name="info" width="lg" label="诊断结论" placeholder="请输入诊断结论" />
          <ProFormSelect
            name="state"
            width="md"
            label="脑损伤阶段"
            options={[
              { label: '0-6小时', value: 1 },
              { label: '6-24小时', value: 2 },
              { label: '24小时-2周', value: 3 },
              { label: '大于2周', value: 4 },
            ]}
          />
          <ProFormSelect
            name="prevHemorrhage"
            width="md"
            label="既往脑出血"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormSelect
            name="prevStroke"
            width="md"
            label="既往卒中"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormSelect
            name="warfarin"
            width="md"
            label="服用华法林"
            options={[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]}
          />
          <ProFormDigit name="T" width="md" label="T(℃)" rules={[{ required: true }]} />
          <ProFormDigit name="P" width="md" label="P(min)" rules={[{ required: true }]} />
          <ProFormDigit name="R" width="md" label="R(min)" rules={[{ required: true }]} />
          <ProFormDigit
            name="systolicPressure"
            width="md"
            label="急诊收缩压(mmHg)"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="diseaseRemark"
            width="lg"
            label="疾病信息备注"
            placeholder="请输入疾病信息备注"
          />
        </ProForm.Group>
      </ProCard>
    </DrawerForm>
  );
};

export default AddPatient;
