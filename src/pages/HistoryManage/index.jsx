import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, Collapse, Empty, Image, message, Spin } from 'antd';
import { useModel, history } from 'umi';
import ProCard from '@ant-design/pro-card';
import { getHistoryResults } from '@/services/api';
import { get } from '@/utils';

const { Panel } = Collapse;
const HistoryManage = () => {
  const [recordList, setRecordList] = useState([]);
  const [defaultKey, setDefaultKey] = useState(0);
  const [spinging, setSpining] = useState(true);

  const { getPatientData, getPatientID } = useModel('patient');
  const currentPatient = getPatientData();
  const patientID = getPatientID();

  const getHistory = useCallback(async () => {
    try {
      const res = await getHistoryResults({
        patientID,
      });
      if (res.data.status === 'success') {
        let rl = get(res, 'data.data.results', []);
        if (rl && rl.length !== 0) {
          rl = rl.map((data) => ({
            time: get(data, 'time', ''),
            ADCList: get(data, 'adc.adc_imgs', []),
            DWIList: get(data, 'dwi.dwi_imgs', []),
            nonPerfusion: get(data, 'non_perfusion.non_perfusion_imgs', []),
            perfusionList: get(data, 'perfusion.perfusion_imgs', []),
            modelType: get(data, 'modelType', 0).toString(),
            resultId: get(data, 'id', 0),
            resultInfo: get(data, 'info', ''),
            resultSize: get(data, 'size', 0),
          }));
        }
        setRecordList(rl);
        setSpining(false);
        return;
      }
      message.error('网络错误，请稍后重试!');
    } catch (e) {
      console.log(e);
      message.error('网络错误，请稍后重试!');
    }
  }, [patientID]);

  useEffect(() => {
    if (!patientID) {
      history.push('/list');
    }
  }, []);

  console.log(recordList);

  const getImgList = useCallback((imgData, text) => {
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
  }, []);

  useEffect(() => {
    getHistory();
  });

  return (
    <ProCard extra={`当前病人:  ${currentPatient.name}`} title="模型历史预测记录">
      {spinging ? (
        <Spin size="large" />
      ) : (
        <>
          {recordList.length === 0 ? (
            <Empty description="暂无数据" />
          ) : (
            <Collapse defaultActiveKey={[defaultKey]}>
              {recordList.map((record, index) => (
                <Panel key={`${record.time}-${index}`} header={record.time.slice(0, 11)}>
                  {getImgList(record.ADCList)}
                  {getImgList(record.DWIList)}
                  {getImgList(record.nonPerfusion)}
                  {getImgList(record.perfusionList)}
                </Panel>
              ))}
            </Collapse>
          )}
        </>
      )}
    </ProCard>
  );
};

export default HistoryManage;
