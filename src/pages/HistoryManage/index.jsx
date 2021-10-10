import React, { useState } from 'react';
import { Collapse, Card, Divider } from 'antd';

const HistoryManage = () => {
  const [recordList, setRecordList] = useState([]);
  const [defaultKey, setDefaultKey] = useState(0);

  return (
    <Card title='模型训练记录'>
      <Collapse defaultActiveKey={[defaultKey]}>
        {
          recordList.length !== 0 && recordList.map((record,index) => (
            <Panel key={index} header={record.time.slice(0, 11)} /*extra={this.genExtra(index)}*/>
            </Panel>
          ))
        }
      </Collapse>
    </Card>
  )
}

export default HistoryManage;
