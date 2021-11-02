import React, { useRef, useState } from 'react';
import ProForm, { StepsForm, ProFormDatePicker, ProFormUploadDragger } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Divider, message, Progress } from 'antd';
import dayjs from 'dayjs';
import { get } from '@/utils';
import { uploadImgs, analyzeImgs, getReport } from '@/services/api';

const ModelPredict = () => {
  const [ADCList, setADCList] = useState([]);
  const [DWIList, setDWIList] = useState([]);
  const [ADCUpload, setADCUpload] = useState([]);
  const [DWIUpload, setDWIUpload] = useState([]);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [adcUploadPercent, setAdcUploadPercent] = useState(0);
  const [dwiUploadPercent, setDwiUploadPercent] = useState(0);
  const [ADCFilename, setADCFilename] = useState('');
  const [DWIFilename, setDWIFilename] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  const formRef = useRef();

  const uploadInterval = setInterval(() => {
    const newPercent = uploadPercent + Number(Math.random().toFixed(2)) + 5;
    if (newPercent <= 96) {
      setUploadPercent(newPercent);
    } else {
      setUploadPercent(96 + Number(Math.random().toFixed(2)));
    }
  }, 1000);

  const handleUpload = () => {
    setShowProgress(true);
    let adcForm = new FormData();
    ADCUpload.forEach((file) => {
      adcForm.append('file', file);
      adcForm.append('patientID', this.id);
      adcForm.append('type', 'ADC');
    });

    let dwiForm = new FormData();
    DWIUpload.forEach((file) => {
      dwiForm.append('file', file);
      dwiForm.append('patientID', this.id);
      dwiForm.append('type', 'DWI');
    });

    Promise.all([
      uploadImgs(adcForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setAdcUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
        },
      }),
      uploadImgs(dwiForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setDwiUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
        },
      }),
    ]).then((results) => {
      clearInterval(uploadInterval);
      const adcResult = results[0];
      const dwiResult = results[1];
      if (adcResult.data.status === 'success' && dwiResult.data.status === 'success') {
        setUploadPercent(100);
        setADCList(get(adcResult, 'data.data.imgs', []));
        setADCFilename(get(adcResult, 'data.data.filename', []));
        setDWIList(get(dwiResult, 'data.data.imgs', []));
        setDWIFilename(get(dwiResult, 'data.data.filename', []));
        message.success('上传成功！');
      } else {
        message.error('网络错误！请稍后重试！');
      }
    });

    return true;
  };

  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button type="primary" onClick={handleUpload}>
                  确认上传
                </Button>
              );
            }

            if (props.step === 1) {
              return <Button type="primary">开始训练</Button>;
            }

            return <Button type="primary">完成</Button>;
          },
        }}
      >
        <StepsForm.StepForm name="base" title="上传卒中影像" onFinish={handleUpload}>
          <ProForm.Group>
            <ProFormDatePicker
              name="date"
              width="md"
              label="卒中影像检查日期"
              initialValue={dayjs()}
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </ProForm.Group>
          <Divider>ADC影像上传</Divider>
          <ProForm.Group>
            <ProFormUploadDragger
              fileList={ADCList}
              width="xl"
              label="选择ADC影像文件"
              name="ADC"
              max={1}
              multiple={false}
              description="选择ADC影像"
            />
          </ProForm.Group>
          {showProgress && (
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={adcUploadPercent}
            />
          )}
          <Divider>DWI影像上传</Divider>
          <ProForm.Group>
            <ProFormUploadDragger
              fileList={DWIList}
              width="xl"
              label="选择DWI影像文件"
              name="DWI"
              max={1}
              multiple={false}
              description="选择DWI影像"
            />
          </ProForm.Group>
          {showProgress && (
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={dwiUploadPercent}
            />
          )}
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title="开始训练"
          onFinish={async () => {
            return true;
          }}
        />
        <StepsForm.StepForm name="time" title="结果查看" />
      </StepsForm>
    </ProCard>
  );
};

export default ModelPredict;
