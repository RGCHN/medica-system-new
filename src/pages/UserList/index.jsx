/*
import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const defaultData = [
  {
    id: 624748504,
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [position, setPosition] = useState('bottom');
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id',
      editable: false
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
      editable: false
    },
    {
      title: '权限',
      dataIndex: 'role',
      key:'role',
      valueType: 'select',
      valueEnum: {
        "管理员": {
          text: '管理员',
          status: 'Processing',
        },
        "主任医生": {
          text: '主任医生',
          status: 'Success',
        },
        "医生": {
          text: '医生',
          status: 'Warning'
        }
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => {
          action?.startEditable?.(record.id);
        }}>
          编辑
        </a>,
        <a key="delete" onClick={() => {
          setDataSource(dataSource.filter((item) => item.id !== record.id));
        }}>
          删除
        </a>,
      ],
    },
  ]

  return (<>
    <EditableProTable rowKey="id" headerTitle="可编辑表格" maxLength={5} recordCreatorProps={position !== 'hidden'
      ? {
        position: position,
        record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
      }
      : false} toolBarRender={() => [
      <ProFormRadio.Group key="render" fieldProps={{
        value: position,
        onChange: (e) => setPosition(e.target.value),
      }} options={[
        {
          label: '添加到顶部',
          value: 'top',
        },
        {
          label: '添加到底部',
          value: 'bottom',
        },
        {
          label: '隐藏',
          value: 'hidden',
        },
      ]}/>,
    ]} columns={columns} request={async () => ({
      data: defaultData,
      total: 3,
      success: true,
    })} value={dataSource} onChange={setDataSource} editable={{
      type: 'multiple',
      editableKeys,
      onSave: async (rowKey, data, row) => {
        console.log(rowKey, data, row);
        await waitTime(2000);
      },
      onChange: setEditableRowKeys,
    }}/>
    <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
      <ProFormField ignoreFormItem fieldProps={{
        style: {
          width: '100%',
        },
      }} mode="read" valueType="jsonCode" text={JSON.stringify(dataSource)}/>
    </ProCard>
  </>);
};
*/
import React, { useState, useEffect, useCallback } from 'react';
import { Button, message } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { getUserList, updateRole, deleteUser } from '@/services/api';
import { roleMap } from '@/pages/dataMap';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id',
      editable: false
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
      editable: false
    },
    {
      title: '权限',
      dataIndex: 'role',
      key:'role',
      valueType: 'select',
      valueEnum: {
        "管理员": {
          text: '管理员',
          status: 'Processing',
        },
        "主任医生": {
          text: '主任医生',
          status: 'Success',
        },
        "医生": {
          text: '医生',
          status: 'Warning'
        }
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, index, action) => [
        <a key="editable" onClick={() => {
          action?.startEditable?.(record.id);
        }}>
          编辑
        </a>,
        <a key="delete" onClick={() => {
          handleDelete(index, record)
        }}>
          删除
        </a>,
      ],
    },
  ];

  const handleUpdateRole = useCallback(async (rowKey, data) => {
    const { id, role } = data;
    const res =  await updateRole({
      userID: id,
      role: roleMap[role]
    })
    if (res.data.status === 'success') {
      setUserData(res.data.data.userInfo);
      message.success(res.data.msg);
    } else {
      message.error(res.data.msg);
    }
  }, []);

  const handleDelete = useCallback(async (rowKey, data) => {
    const { id } = data;
    const res = await deleteUser({
      userID: id
    })
    if (res.data.status === 'success') {
      setUserData(res.data.data.userInfo);
      message.success(res.data.msg);
    } else {
      message.error(res.data.msg);
    }
  }, [])

  useEffect(() => {
    getUserList().then(res => {
      console.log(res);
      if (res.data.status === 'success') {
        setUserData(res.data.data.userInfo);
      } else {
        message.error(res.data.msg);
        setUserData([]);
      }
    }, err => {
      setUserData([]);
    })
  }, [])

  return (
    <PageContainer>
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={userData}
        onChange={setUserData}
        recordCreatorProps={false}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onDelete: handleDelete,
          onSave: handleUpdateRole,
        }}/>
    </PageContainer>
  )
}

export default UserList;


