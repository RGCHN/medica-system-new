import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Tag, Button, message } from 'antd';
import { NavLink } from '@umijs/preset-dumi/lib/theme';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { stateMap } from '../dataMap';
import { getPatientList } from '@/services/api';
import AddPatient from '@/pages/TableList/components/AddPatient';

const DEFAULT_DATA = [
  {
    key:'1',
    id: '1',
    recordID:'1111',
    doctor:'张伟华医师',
    name: '李兵',
    sex:'男',
    age: 32,
    cva: '出血性脑梗塞',
    state: '1',
    updateTime: '2020-9-11',
  },
  {
    key:'2',
    id: '2',
    recordID:'2222',
    doctor:'张伟华医师',
    name: '林硕',
    sex:'男',
    cva: '缺血性脑梗塞',
    age: 18,
    state: '2',
    updateTime: '2020-01-15',
  },
  {
    key:'3',
    id: '3',
    recordID:'3333',
    doctor:'王业医师',
    name: '刘雯',
    sex:'女',
    age: 55,
    cva: '缺血性脑梗塞',
    state: '3',
    updateTime: '2020-05-23',
  },
  {
    key:'4',
    id: '4',
    recordID:'4444',
    doctor:'李涛医师',
    sex:'女',
    name: '吴芬婷',
    age: 82,
    cva: '出血性脑梗塞',
    state: '4',
    updateTime: '2019-12-27',
  },
];
const listColumns = [
  {
    title: '病例编号',
    dataIndex: 'id',
    key: 'id',
    copyable: true,
    ellipsis: true,
    width:100
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
    width:60,
    filters: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      male: { text: '男', status: '男'},
      female: { text: '女', status: '女'}
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    width:60
  },
  {
    title: '脑损伤阶段',
    dataIndex: 'state',
    key: 'state',
    ellipsis: true,
    render: (_, record) => {
      const state = record.state;
      return (
        <span>{stateMap[state]}</span>
      )
    },
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
    width:120
  },
  {
    title: '病案号',
    dataIndex: 'recordID',
    key: 'recordID',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '最近更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    ellipsis: true,
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'action',
    render: id => (
      <Space size="middle">
        <Button>
          <NavLink to={`/patientInfo/basic/${id}/edit`}>查看</NavLink>
        </Button>
      </Space>
    ),
  },
];
const operatorColumns = [
  {
    title: '病案号',
    dataIndex: 'recordID',
    key: 'recordID',
    ellipsis: true,
    width:100
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    width:100
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    ellipsis: true,
    width:60,
    render: sex => {
      if (sex.toString() === '0') {
        return (
          <span>男</span>
        )
      } else {
        return (
          <span>女</span>
        )
      }
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    width:60
  },
  {
    title: '脑损伤阶段',
    dataIndex: 'state',
    key: 'state',
    ellipsis: true,
    render: state => {
      return (
        <span>{stateMap[state]}</span>
      )
    },
  },
  {
    title: '负责医师',
    dataIndex: 'doctor',
    key: 'doctor',
    ellipsis: true,
    width:120
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'action',
    render: id => (
      <Space size="middle">
        <Button>
          <NavLink to={`/patientInfo/basic/${id}/edit`}>编辑</NavLink>
        </Button>
      </Space>
    ),
  },
];

const TableList = () => {
  const [ patientData, setPatientData] = useState([]);
  const actionRef = useRef();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const getPatients = useCallback(async () => {
    try {
      const res = await getPatientList();
      const status = res.data.status;
      if (status === 'success') {
        setPatientData(res.data.data.patientList);
        return ;
      } else {
        setPatientData([]);
      }
    } catch (error) {
      setPatientData([]);
    }
  }, [])

  useEffect(() => {
    getPatients();
    // setPatientData(DEFAULT_DATA);
  }, [])

  const handleChange = useCallback(() => {

  }, [])

  return (
    <PageContainer>
      <ProTable
        columns={listColumns}
        actionRef={actionRef}
        request={() => {
          return Promise.resolve({
            data: patientData,
            success: true
          })
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
           }
            return values;
          }
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddPatient />,
          <Button key="out">
            导出数据
          </Button>,
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
