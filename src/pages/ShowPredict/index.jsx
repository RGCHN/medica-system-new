import React, { useEffect, useRef, useState } from 'react';
import ProForm, { StepsForm, ProFormDatePicker, ProFormUploadDragger } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Carousel, Divider, Image, message, Space, Upload, Progress } from 'antd';
import dayjs from 'dayjs';
import { history } from 'umi';
import { get } from '@/utils';
import { uploadImgs, analyzeImgs, getReport } from '@/services/api';
import { useIntl, useModel } from 'umi';
import { modelHttp } from '@/request';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  draggable: true,
};

const ModelPredict = () => {
  const [ADCList, setADCList] = useState([]); //ADC影像列表
  const [DWIList, setDWIList] = useState([]); //DWI影像列表
  const [ADCUpload, setADCUpload] = useState([]); //ADC表单fileList
  const [DWIUpload, setDWIUpload] = useState([]); // DWI表单filelist
  const [uploadPercent, setUploadPercent] = useState(0); // 上传进度
  const [adcUploadPercent, setAdcUploadPercent] = useState(0); // ADC上传进度
  const [dwiUploadPercent, setDwiUploadPercent] = useState(0); //DWI上传进度
  const [ADCFilename, setADCFilename] = useState('');
  const [DWIFilename, setDWIFilename] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [analyzePercent, setAnalyzePercent] = useState(0);
  const [resultSize, setResultSize] = useState(0);
  const [resultInfo, setResultInfo] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [nonPerfusion, setNonPerfusion] = useState([]);
  const [perfusionList, setPerfusionList] = useState([]);
  const [resultID, setResultID] = useState(undefined);
  const [uploading, setUploading] = useState(false);

  const formRef = useRef();
  const { getPatientID } = useModel('patient');
  const patientID = getPatientID();

  const uploadInterval = setInterval(() => {
    const newPercent = uploadPercent + Number(Math.random().toFixed(2)) + 5;
    if (newPercent <= 96) {
      setUploadPercent(newPercent);
    } else {
      setUploadPercent(96 + Number(Math.random().toFixed(2)));
    }
  }, 1000);

  const goPredict = (props) => {
    setAnalyzePercent(0);
    setPredicting(true);
    const predictInterval = setInterval(() => {
      if (analyzePercent <= 98) {
        setAnalyzePercent(analyzePercent + 1);
      } else {
        clearInterval(predictInterval);
      }
    }, 2000);

    analyzeImgs({
      adc_file: ADCFilename,
      backmodel: '0',
      dwi_file: DWIFilename,
      patientID: patientID,
      // TODO 时间戳改成form的内容
      timestamp: new Date().getTime(),
    }).then(
      (res) => {
        if (predictInterval) {
          clearInterval(predictInterval);
        }
        setPredicting(false);
        setAnalyzePercent(100);
        if (res.data.status === 'fail') {
          message.error('输入参数有误！请重新输入');
        } else {
          setNonPerfusion(get(res, 'data.data.nonperf_res_imgs', []));
          setNonPerfusion(get(res, 'data.data.perf_res_imgs', []));
          setResultInfo(get(res, 'data.data.info', ''));
          setResultSize(get(res, 'data.data.size', 0));
          setResultID(get(res, 'data.data.resultID', 0));
        }
        setPredicting(false);
        props?.onSubmit();
        return true;
      },
      (err) => {
        message.error('网络错误！请稍后重试！');
        setPredicting(false);
        return false;
      },
    );
  };

  const getImgList = (imgData, text) => {
    if (imgData.length === 0) {
      return;
    }
    return (
      <>
        <div>{text}</div>
        <Carousel {...settings}>
          {imgData.map((item, index) => (
            <>
              <Image src={item} alt="" key={index} height="160px" width="160px" />
              <div className="img-index">{index + 1}</div>
            </>
          ))}
        </Carousel>
      </>
    );
  };

  const beforeUpload = (file, type) => {
    if (type === 'ADC') {
      setADCUpload([...ADCUpload, file]);
    }
    if (type === 'DWI') {
      setDWIUpload([...DWIUpload, file]);
    }

    return false;
  };

  const handleUpload = async (props) => {
    setShowProgress(true);
    setUploading(true);

    let adcForm = new FormData();
    ADCUpload.forEach((file) => {
      adcForm.append('file', file);
      adcForm.append('patientID', patientID);
      adcForm.append('type', 'ADC');
    });

    let dwiForm = new FormData();
    DWIUpload.forEach((file) => {
      dwiForm.append('file', file);
      dwiForm.append('patientID', patientID);
      dwiForm.append('type', 'DWI');
    });

    const results = await Promise.all([
      modelHttp.post('/imgUpload', adcForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setAdcUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
          console.log(adcUploadPercent);
        },
      }),
      modelHttp.post('/imgUpload', dwiForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setDwiUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
          console.log(dwiUploadPercent);
        },
      }),
    ]);

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
      setUploading(false);
      props.onSubmit?.();
      return true;
    } else {
      message.error('网络错误！请稍后重试！');
      setUploading(false);
      return false;
    }
  };

  useEffect(() => {
    if (!patientID) {
      history.push('/list');
    }
    console.log(patientID);
  }, [patientID]);

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
                <>
                  <Space />
                  <Button
                    type="primary"
                    onClick={() => handleUpload(props)}
                    disabled={ADCUpload.length !== 1 || DWIUpload.length !== 1}
                    loading={uploading}
                  >
                    上传数据
                  </Button>
                </>
              );
            }
            if (props.step === 1) {
              return (
                <Button type="primary" onClick={() => goPredict(props)}>
                  开始分割
                </Button>
              );
            }
            return [
              <Button key="gotoTwo">{'<'} 返回第二步</Button>,
              <Button type="primary" key="goToTree">
                提交
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm name="upload" title="上传卒中影像">
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
          <Divider>ADC影像上传</Divider>
          <Dragger
            label="选择ADC影像文件"
            name="ADC"
            fileList={ADCUpload}
            max={1}
            onRemove={() => setADCUpload([])}
            beforeUpload={(file) => beforeUpload(file, 'ADC')}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件上传</p>
            <p className="ant-upload-hint">选择ADC影像</p>
          </Dragger>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={adcUploadPercent}
          />
          <Divider>DWI影像上传</Divider>
          <Dragger
            label="选择DWI影像文件"
            name="DWI"
            fileList={DWIUpload}
            onRemove={() => setDWIUpload([])}
            beforeUpload={(file) => beforeUpload(file, 'DWI')}
            max={1}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件上传</p>
            <p className="ant-upload-hint">选择ADC影像</p>
          </Dragger>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={dwiUploadPercent}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="analyze"
          title="AI模型预测"
          onFinish={async () => {
            return true;
          }}
        >
          {getImgList(ADCList, '【ADC影像】')}
          {getImgList(DWIList, '【DWI影像】')}
          <div>【模型分析进度】</div>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={analyzePercent}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="result" title="结果查看">
          <Button type="primary mr-3" onClick={getReport}>
            下载生成辅助报告
          </Button>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default ModelPredict;
