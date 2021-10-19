import React, { useState } from 'react';
import { Collapse, Card } from 'antd';
import { useModel } from 'umi';

const HistoryManage = () => {
  const [recordList, setRecordList] = useState([]);
  const [defaultKey, setDefaultKey] = useState(0);
  const  { currentPatient }= useModel('patient');

  return (
    <Card title='模型训练记录'>
      <Collapse defaultActiveKey={[defaultKey]}>
        {
          recordList.length !== 0 && recordList.map((record,index) => (
            <Panel key={index} header={record.time.slice(0, 11)} /*extra={this.genExtra(index)}*/ />
          ))
        }
      </Collapse>
    </Card>
  )
}

export default HistoryManage;
