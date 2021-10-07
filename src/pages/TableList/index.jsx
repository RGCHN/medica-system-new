import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Radio, Tag, Button, Input, Spin } from 'antd';
import { NavLink } from '@umijs/preset-dumi/lib/theme';


/*mock数据*/
const stateMap = {
  "1": "0-6小时",
  "2": "6-24小时",
  "3": "24小时-2周",
  "4": "大于2周",
}
export const userTypeMap = {
  "1": "管理员",
  "2": "主任医生",
  "3": "医生",
}

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
    width:60
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    width:60
  },
  {
    title: '脑卒中分类',
    dataIndex: 'cva',
    key: 'cva',
    ellipsis: true,
    width: 140,
    render: cva => {
      let color = 'geekblue';
      if (cva === '出血性脑梗塞') {
        color = 'green';
      }
      return (
        <Tag color={color} key={cva}>
          {cva}
        </Tag>
      );
    },
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
    title: '就诊卡号/医保号',
    dataIndex: 'recordID',
    key: 'recordID',
    ellipsis: true,

  },
  {
    title: '最近更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    ellipsis: true,
  },
];
const operatorColumns = [
  {
    title: '病例编号',
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
    title: '脑卒中分类',
    dataIndex: 'cva',
    key: 'cva',
    ellipsis: true,
    width: 140,
    render: cva => {
      let color = 'geekblue';
      if (cva === "in") {
        color = 'green';
      }
      return (
        <Tag color={color} key={cva}>
          {cva === "in" ? "缺血性脑梗塞" : "出血性脑梗塞"}
        </Tag>
      );
    },
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  useEffect(() => {
    setPatientData(DEFAULT_DATA)
  }, [])

  const handleChange = useCallback(() => {

  }, [])

  return (
    <PageContainer>
      <Table
        rowSelection={{
          type: null,
          ...rowSelection,
        }}
        columns={ listColumns}
        dataSource={patientData}
        onChange={handleChange}
        pagination = {{position:['bottomCenter']}}/>
    </PageContainer>
  );
};

export default TableList;
