import React, { useRef, useState } from 'react';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDateRangePicker, ProFormUploadDragger,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Divider, message } from 'antd';
import { waitTime } from '@/utils';
import dayjs from 'dayjs';

const ModelPredict = (props) => {
  const [CBFList, setCBFList] = useState([]);
  const [CBVList, setCBVList] = useState([]);
  const [MTTList, setMTTList] = useState([]);
  const [TMAXList, setTMAXList] = useState([]);
  const [DWIList, setDWIList] = useState([]);
  const [recordTime, setRecordTime] = useState('');
  const tempDate = useRef('');
  const formRef = useRef();


  const onUploadFinish = async () => {
    console.log(values);
    message.success('上传卒中影像成功！');
  }

  return (
    <ProCard>
      <StepsForm formRef={formRef} onFinish={async () => {
        await waitTime(1000);
        message.success('提交成功');
      }} formProps={{
        validateMessages: {
          required: '此项为必填项',
        },
      }}>
        <StepsForm.StepForm
          name="base" title="上传卒中影像"
          onFinish={onUploadFinish}
        >
          <ProForm.Group>
            <ProFormDatePicker
              name="date" width='md' label='卒中影像检查日期'
              initialValue={dayjs()}
              rules={[{
                required: true
              }]}
            />
          </ProForm.Group>
          <Divider>CT灌注影像上传（必传）</Divider>
          <ProForm.Group>
            <ProFormUploadDragger
              fileList={CBFList}
              width='xl'  max={1} label="CBF影像" multiple={false}
              name="CBF" description='选择CBF文件'
              rules={[{
                required: true
              }]}
            />
            <ProFormUploadDragger
              fileList={CBVList}
              width='xl'  max={1} label="CBV影像" multiple={false}
              name="CBV" description='选择CBV文件'
              rules={[{
                required: true
              }]}
            />
            <ProFormUploadDragger
              fileList={MTTList}
              width='xl'  max={1} label="MTT影像" multiple={false}
              name="MTT" description='选择MTT文件'
              rules={[{
                required: true
              }]}
            />
            <ProFormUploadDragger
              fileList={TMAXList}
              width='xl'  max={1} label="TMAX影像" multiple={false}
              name="TMAX" description='选择TMAX文件'
              rules={[{
                required: true
              }]}
            />
          </ProForm.Group>
          <Divider>DWI影像上传（选传）</Divider>
          <ProForm.Group>
            <ProFormUploadDragger
              fileList={DWIList}
              width='xl' label="DWI影像" name="DWI" max={1} multiple={false} description='选择DWI'/>
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox" title="开始训练"
          onFinish={async () => {return true;}}
        >
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="结果查看" >
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  )
}

export default ModelPredict;
