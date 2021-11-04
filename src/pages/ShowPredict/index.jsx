import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StepsForm, ProFormDatePicker } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Divider, Image, message, Space, Upload, Progress, Typography } from 'antd';
import dayjs from 'dayjs';
import { useModel } from 'umi';
import { modelHttp } from '@/request';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { get } from '@/utils';
import { analyzeImgs, getReport } from '@/services/api';
const { Dragger } = Upload;

const ModelPredict = () => {
  const [ADCList, setADCList] = useState([]); //ADC影像列表
  const [DWIList, setDWIList] = useState([]); //DWI影像列表
  const [ADCUpload, setADCUpload] = useState([]); //ADC表单fileList
  const [DWIUpload, setDWIUpload] = useState([]); // DWI表单filelist
  const [adcUploadPercent, setAdcUploadPercent] = useState(0); // ADC上传进度
  const [dwiUploadPercent, setDwiUploadPercent] = useState(0); //DWI上传进度
  const [ADCFilename, setADCFilename] = useState('');
  const [DWIFilename, setDWIFilename] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [resultSize, setResultSize] = useState(0);
  const [resultInfo, setResultInfo] = useState('');
  const [predicting, setPredicting] = useState(false);
  const [analyzePercent, setAnalyzePercent] = useState(0);
  const [nonPerfusion, setNonPerfusion] = useState([]);
  const [perfusionList, setPerfusionList] = useState([]);
  const [resultID, setResultID] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const time = useRef();
  const formRef = useRef();
  const predictInterval = useRef(undefined);
  const temp = useRef(0);

  const { getPatientID, getPatientData } = useModel('patient');
  const patientID = getPatientID();
  const currentPatient = getPatientData();

  const updateAnalyzePercent = useCallback(() => {
    if (!predictInterval.current) {
      predictInterval.current = setInterval(() => {
        if (analyzePercent <= 98) {
          temp.current = Math.floor((temp.current + Math.random()) * 100) / 100;
          setAnalyzePercent(temp.current);
        } else {
          clearInterval(predictInterval.current);
        }
      }, 1000);
    }
  }, []);

  const goPredict = async (props) => {
    setAnalyzePercent(0);
    temp.current = 0;
    setPredicting(true);
    updateAnalyzePercent();
    try {
      const res = await analyzeImgs({
        adc_file: ADCFilename,
        backmodel: '0',
        dwi_file: DWIFilename,
        patientID: patientID,
        timestamp: time.current,
      });
      if (predictInterval.current) {
        clearInterval(predictInterval.current);
      }
      setPredicting(false);
      setAnalyzePercent(100);
      setPredicting(false);
      if (res.data.status === 'success') {
        setNonPerfusion(get(res, 'data.data.nonperf_res_imgs', []));
        setPerfusionList(get(res, 'data.data.perf_res_imgs', []));
        setResultInfo(get(res, 'data.data.info', ''));
        setResultSize(get(res, 'data.data.size', 0));
        setResultID(get(res, 'data.data.resultID', 0));
        props.onSubmit();
        return true;
      } else {
        message.error('网络错误！');
        return false;
      }
    } catch (e) {
      message.error('网络错误！');
      console.log(e);
      return false;
    }
  };

  const getImgList = (imgData) => {
    if (imgData.length === 0) {
      return;
    }
    return (
      <Image.PreviewGroup>
        {imgData.map((item, index) => (
          <Image src={item} alt="" key={index} height="160px" width="160px" />
        ))}
      </Image.PreviewGroup>
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

    time.current = formRef.current.getFieldValue('date').valueOf();

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

    try {
      const results = await Promise.all([
        modelHttp.post('/imgUpload', adcForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            setAdcUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
          },
        }),
        modelHttp.post('/imgUpload', dwiForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            setDwiUploadPercent(((progressEvent.loaded / progressEvent.total) * 100) | 0);
          },
        }),
      ]);
      const adcResult = results[0];
      const dwiResult = results[1];
      if (adcResult.data.status === 'success' && dwiResult.data.status === 'success') {
        setADCList(get(adcResult, 'data.data.imgs', []));
        setADCFilename(get(adcResult, 'data.data.filename', []));
        setDWIList(get(dwiResult, 'data.data.imgs', []));
        setDWIFilename(get(dwiResult, 'data.data.filename', []));
        message.success('上传成功！');
        setUploading(false);
        props.onSubmit();
        return true;
      } else {
        message.error('网络错误！请稍后重试！');
        setUploading(false);
        return false;
      }
    } catch (e) {
      console.log(e);
      message.error('网络错误！请稍后重试！');
      return false;
    }
  };

  const downloadReport = async () => {
    setDownloading(true);
    try {
      const res = await getReport({
        resultID: resultID,
      });
      const blob = new Blob([res.data], {
        type: 'application/pdf',
      });
      const objectUrl = URL.createObjectURL(blob);
      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = objectUrl;
      aLink.download = `辅助诊断报告-${currentPatient.name}-${dayjs(time.current).format(
        'YYYY-MM-DD',
      )}`;
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
      setDownloading(false);
    } catch (e) {
      setDownloading(false);
      message.error('发生错误！请稍后重试');
      console.log(e);
    }
  };

  useEffect(() => {
    if (!patientID) {
      history.push('/list');
    }
  }, [patientID]);

  return (
    <ProCard title={`当前病人:  ${currentPatient.name}`}>
      <StepsForm
        formRef={formRef}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        submitter={{
          render: (props) => {
            const { step } = props;
            if (step === 0) {
              return (
                <ProCard>
                  <Button
                    type="primary"
                    onClick={() => handleUpload(props)}
                    disabled={ADCUpload.length !== 1 || DWIUpload.length !== 1}
                    loading={uploading}
                  >
                    上传数据
                  </Button>
                </ProCard>
              );
            }
            if (step === 1) {
              return (
                <ProCard>
                  <Button type="primary" onClick={() => goPredict(props)} loading={predicting}>
                    {predicting ? '正在分割' : '开始分割'}
                  </Button>
                </ProCard>
              );
            }
            if (step === 2) {
              return (
                <ProCard>
                  <Button
                    key="download"
                    type="primary"
                    onClick={downloadReport}
                    icon={<DownloadOutlined />}
                    loading={downloading}
                  >
                    {downloading ? '正在下载' : '辅助诊疗报告下载'}
                  </Button>
                </ProCard>
              );
            }
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
          <Space direction="vertical" />
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
        <StepsForm.StepForm name="analyze" title="AI模型预测">
          <ProCard title="ADC影像" headerBordered collapsible>
            {getImgList(ADCList)}
          </ProCard>
          <ProCard title="DWI影像" headerBordered collapsible>
            {getImgList(DWIList)}
          </ProCard>

          <div>【模型分割进度】</div>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={analyzePercent}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="result" title="结果查看">
          <ProCard title="血管再通最终梗死区预测" headerBordered collapsible>
            {getImgList(perfusionList)}
          </ProCard>
          <ProCard title="血管未再通梗死区预测" headerBordered collapsible>
            {getImgList(nonPerfusion)}
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default ModelPredict;
