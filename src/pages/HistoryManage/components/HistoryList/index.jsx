import React, { useCallback, useEffect, useState } from 'react';
import { Collapse, Empty, Image, message, Space, Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import { getHistoryResults, getReport } from '@/services/api';
import { get } from '@/utils';
import { useModel } from 'umi';

const { Panel } = Collapse;

const HistoryList = () => {
  const [recordList, setRecordList] = useState([]);
  const [defaultKey, setDefaultKey] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
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
            resultInfo: get(data, 'info', 0).toFixed(2),
            resultSize: get(data, 'size_percent', 0),
          }));
          setRecordList(rl);
        }
        setSpining(false);
        return;
      }
      message.error('网络错误，请稍后重试!');
    } catch (e) {
      console.log(e);
      message.error('网络错误，请稍后重试!');
    }
  }, [patientID]);

  const downloadReport = async (record) => {
    if (downloading) {
      return;
    }
    setDownloading(true);
    const { resultId } = record;
    try {
      const res = await getReport({
        resultID: resultId,
      });
      const blob = new Blob([res.data], {
        type: 'application/pdf',
      });
      const objectUrl = URL.createObjectURL(blob);
      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = objectUrl;
      aLink.download = `辅助诊断报告-${currentPatient.name}-${record.time}`;
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

  const getImgList = useCallback((imgData) => {
    if (imgData.length === 0) {
      return;
    }
    return (
      <Image.PreviewGroup>
        <Space wrap>
          {imgData.map((item, index) => (
            <Image src={item} alt="" key={index} height="50px" width="50px" />
          ))}
        </Space>
      </Image.PreviewGroup>
    );
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ProList
      loading={spinging}
      rowKey="resultId"
      split
      expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
      dataSource={recordList}
      metas={{
        title: {
          render: (text, record) => (
            <Space>
              <Tag color="blue">{record.time}</Tag>
              <Tag color="geekblue">
                梗死区域面积: {record.resultInfo}, 占比{(record.resultSize / 100).toFixed(2)}%
              </Tag>
              <Tag color="green" onClick={() => downloadReport(record)}>
                下载辅助报告
              </Tag>
            </Space>
          ),
        },
        description: {
          render: (text, record) => {
            return (
              <Collapse defaultActiveKey={[defaultKey]}>
                <Panel key="ADC" header="ADC影像">
                  {getImgList(record.ADCList)}
                </Panel>
                <Panel key="DWI" header="DWI影像">
                  {getImgList(record.DWIList)}
                </Panel>
                <Panel key="nonPerfusion" header="不溶栓梗死区预测">
                  {getImgList(record.nonPerfusion)}
                </Panel>
                <Panel key="perfusion" header="溶栓后梗死区预测">
                  {getImgList(record.perfusionList)}
                </Panel>
              </Collapse>
            );
          },
        },
      }}
    />
  );
};

export default HistoryList;
