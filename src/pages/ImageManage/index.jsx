import React, { useState, useRef } from 'react';
import { Button, Collapse, message, Card, Divider } from 'antd';
import dayjs from 'dayjs';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect, ProFormUploadDragger,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const ImageManage = () => {
  const [recordList, setRecordList] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [defaultKey, setDefaultKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const tempDate = useRef('');
  const formRef = useRef();

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true);
    if (tempDate.current !== '') {
      setRecordList(recordList.concat({time: tempDate.current}));
      setDefaultKey(recordList.length);
    } else {
      message.error("输入的日期错误！请重新输入")
    }
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      message.success("添加诊疗记录成功！")
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
  }

  const onChange = (date, dateString) => {
    tempDate.current = dateString;
  }

  const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const drawerComponent = <DrawerForm title="新建影像记录" formRef={formRef} trigger={<Button type="primary">
    <PlusOutlined />
    新建影像记录
  </Button>} drawerProps={{
    forceRender: true,
    destroyOnClose: true,
  }} onFinish={async (values) => {
    await waitTime(2000);
    console.log(values.name);
    message.success('新建记录成功！');
    // 不返回不会关闭弹框
    return true;
  }}>
    <ProForm.Group>
      <ProFormDatePicker name="date" width='md' label='检查日期' initialValue={dayjs()} />
      <ProFormUploadDragger width='xl' label="CBF影像上传" name="CBF" />
      <ProFormUploadDragger width='xl' label="CBV影像上传" name="CBV" />
      <ProFormUploadDragger width='xl' label="MTT影像上传" name="MTT" />
      <ProFormUploadDragger width='xl' label="TMAX影像上传" name="TMAX" />
      <ProFormUploadDragger width='xl' label="DWI" name="DWI" />
    </ProForm.Group>
  </DrawerForm>

  return (
    <Card title='卒中影像记录' extra={drawerComponent}>
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

export default ImageManage;
