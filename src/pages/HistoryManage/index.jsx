import React, { useState } from 'react';
import { Collapse } from 'antd';
import { useModel } from 'umi';
import ProCard from '@ant-design/pro-card';

const { Panel } = Collapse;
const HistoryManage = () => {
  const [recordList, setRecordList] = useState([]);
  const [defaultKey, setDefaultKey] = useState(0);
  const { getPatientData } = useModel('patient');
  const currentPatient = getPatientData();

  return (
    <ProCard title={`当前病人:  ${currentPatient.name}`}>
      <Collapse defaultActiveKey={[defaultKey]}>
        {recordList.length !== 0 &&
          recordList.map((record, index) => (
            <Panel key={index} header={record.time.slice(0, 11)} /*extra={this.genExtra(index)}*/ />
          ))}
      </Collapse>
    </ProCard>
  );
};

export default HistoryManage;
