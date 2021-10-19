import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import ProTable from '@ant-design/pro-table';
import { getPatientList } from '@/services/api';
import AddPatient from '@/components/AddPatient';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from '@umijs/preset-dumi/lib/theme';

const TableList = () => {
  const  [ patientData, setPatientData] = useState([]);
  const  { setCurrentPatient }= useModel('patient');
  const actionRef = useRef();

  const listColumns = [
    /*{
      title: '病人编号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      copyable: true,
    },*/
    {
      title: '病案号',
      dataIndex: 'recordID',
      key: 'recordID',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      copyable: true,
      key: 'name',
      ellipsis: true,
      width:100
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      ellipsis: true,
      initialValue: 'all',
      onFilter: true,
      filters: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        0: { text: '男', status: 'Processing'},
        1: { text: '女', status: 'Warning'}
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
    },
    {
      title: '脑损伤阶段',
      dataIndex: 'state',
      key: 'state',
      ellipsis: false,
      onFilter: true,
      filters: true,
      valueType: 'select',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        '1': { text: '0-6小时', status: 'Error'},
        '2': { text: '6-24小时', status: 'Success'},
        '3': { text: '24小时-2周', status: 'Processing'},
        '4': { text: '大于2周', status: 'Default'},
      }
    },
    {
      title: '负责医师',
      dataIndex: 'doctor',
      key: 'doctor',
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      sorter: (a, b) => a.updateTime - b.updateTime,
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      render: id => {
        return (
          <div onClick={() => {
            setCurrentPatient(id);
          }}>
            <div key='message'><NavLink  to={`manage/message`}>详细信息</NavLink></div>
            <div key='predict'><NavLink to={`manage/predict`}>新建预测</NavLink></div>
            <div  key='image'><NavLink to={`manage/image`}>预测记录</NavLink></div>
          </div>
        )
        /* return [
           <div key='message'><NavLink  to={`manage/message`}>详细信息</NavLink></div>,
           <div key='predict'><NavLink to={`manage/predict`}>新建预测</NavLink></div>,
           <div  key='image'><NavLink to={`manage/image`}>预测记录</NavLink></div>,
         ]*/
      },
    },
  ];

  const getPatients = useCallback(async () => {
    try {
      const res = await getPatientList();
      const status = res.data.status;
      if (status === 'success') {
        setPatientData(res.data.data.patientList);
        return ;
      }
      message.error(res.data.msg);
      setPatientData([]);
    } catch (error) {
      setPatientData([]);
    }
  }, [])

  useEffect(() => {
    getPatients();
  }, [])

  return (
    <PageContainer fixedHeader={true}>
      <ProTable
        columns={listColumns}
        actionRef={actionRef}
        dataSource={patientData}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddPatient key="add" title='新建病患记录' trigger={<Button type="primary"><PlusOutlined />新建</Button>}/>,
        ]}
        options={{
          show: true,
          density: false,
          fullScreen: true,
          setting: true,
        }}
      />
    </PageContainer>
  );
};

export default TableList;
