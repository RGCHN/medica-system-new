import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel, useIntl } from 'umi';
import ProTable from '@ant-design/pro-table';
import { getPatientList } from '@/services/api';
import AddPatient from '@/components/AddPatient';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Input } from 'antd';
import { NavLink } from 'umi';

const { Search } = Input;

const TableList = () => {
  const [patientData, setPatientData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const { setPatientID, setCurrentPatient } = useModel('patient');
  const actionRef = useRef();
  const intl = useIntl();

  const listColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      copyable: true,
      width: 100,
      fixed: 'left',
      key: 'name',
    },
    {
      title: '病人编号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      ellipsis: false,
      copyable: true,
    },
    {
      title: '病案号',
      dataIndex: 'recordID',
      key: 'recordID',
      ellipsis: false,
      copyable: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      initialValue: 'all',
      onFilter: true,
      filters: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        0: { text: '男', status: 'Processing' },
        1: { text: '女', status: 'Warning' },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
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
        1: { text: '0-6小时', status: 'Error' },
        2: { text: '6-24小时', status: 'Success' },
        3: { text: '24小时-2周', status: 'Processing' },
        4: { text: '大于2周', status: 'Default' },
      },
    },
    {
      title: '负责医师',
      dataIndex: 'doctor',
      key: 'doctor',
      ellipsis: false,
    },
    {
      title: '发病日期',
      dataIndex: 'strokeTime',
      key: 'strokeTime',
      ellipsis: false,
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '就诊时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: false,
      sorter: (a, b) => a.createTime - b.createTime,
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: false,
      sorter: (a, b) => a.updateTime - b.updateTime,
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (node, record) => {
        return (
          <Space
            onClick={(e) => {
              setPatientID(record.id);
              setCurrentPatient(record);
            }}
          >
            <NavLink to={`manage/message`}>详情</NavLink>
            <NavLink to={`manage/predict`}>预测</NavLink>
            <NavLink to={`manage/image`}>记录</NavLink>
          </Space>
        );
      },
    },
  ];

  const getPatients = useCallback(async () => {
    try {
      const res = await getPatientList();
      const status = res.data.status;
      if (status === 'success') {
        setPatientData(res.data.data.patientList);
        setFullData(res.data.data.patientList);
        return;
      }
      message.error(res.data.msg);
      setPatientData([]);
      setFullData([]);
    } catch (error) {
      setPatientData([]);
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'app.error.network',
        defaultMessage: '网络连接错误！',
      });
      message.error(defaultLoginFailureMessage);
    }
  }, []);

  const handleReload = () => {
    getPatients();
  };

  const onSearch = (name) => {
    if (fullData.length === 0) {
      return;
    }
    if (!name) {
      setPatientData(fullData);
    } else {
      const list = fullData.filter((p) => p.name === name);
      setPatientData(list);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <PageContainer fixedHeader={true}>
      <ProTable
        scroll={{ x: 1200 }}
        columns={listColumns}
        actionRef={actionRef}
        dataSource={patientData}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Search
            key="search"
            placeholder="输入患者姓名"
            enterButton="查询"
            size="Large"
            onSearch={onSearch}
          />,
          <AddPatient
            key="add"
            finishCallback={handleReload}
            title="新建病患记录"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建
              </Button>
            }
          />,
        ]}
        options={{
          show: true,
          density: false,
          fullScreen: true,
          setting: true,
          reload: handleReload,
        }}
      />
    </PageContainer>
  );
};

export default TableList;
