import React, { useState, useEffect, useCallback } from 'react';
import { Button, message, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { getUserList, updateRole, deleteUser } from '@/services/api';
import { roleMap } from '@/pages/dataMap';
import { useIntl } from 'umi';
import AddPatient from '@/components/AddPatient';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const intl = useIntl();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      editable: false,
    },
    {
      title: '权限',
      dataIndex: 'role',
      key: 'role',
      valueType: 'select',
      valueEnum: {
        管理员: {
          text: '管理员',
          status: 'Processing',
        },
        主任医生: {
          text: '主任医生',
          status: 'Success',
        },
        医生: {
          text: '医生',
          status: 'Warning',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          修改权限
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleDelete(index, record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleUpdateRole = useCallback(async (rowKey, data) => {
    const { id, role } = data;
    const res = await updateRole({
      userID: id,
      role: roleMap[role],
    });
    if (res.data.status === 'success') {
      setUserData(res.data.data.userInfo);
      setFullData(res.data.data.userInfo);
      message.success(res.data.msg);
    } else {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'app.error.network',
        defaultMessage: '网络连接错误！',
      });
      message.error(defaultLoginFailureMessage);
    }
  }, []);

  const handleDelete = useCallback(async (rowKey, data) => {
    const { id } = data;
    const res = await deleteUser({
      userID: id,
    });
    if (res.data.status === 'success') {
      setUserData(res.data.data.userInfo);
      setFullData(res.data.data.userInfo);
    } else {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'app.error.network',
        defaultMessage: '网络连接错误！',
      });
      message.error(defaultLoginFailureMessage);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const res = await getUserList();
      if (res.data.status === 'success') {
        setUserData(res.data.data.userInfo);
        setFullData(res.data.data.userInfo);
        return;
      }
      message.error(res.data.msg);
      setUserData([]);
      setFullData([]);
    } catch (e) {
      setUserData([]);
      setFullData([]);
    }
  }, []);

  const onSearch = (name) => {
    if (fullData.length === 0) {
      return;
    }
    if (!name) {
      setUserData(fullData);
    } else {
      const list = fullData.filter((p) => p.name === name);
      setUserData(list);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <PageContainer>
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={userData}
        onChange={setUserData}
        recordCreatorProps={false}
        search={false}
        toolBarRender={() => [
          <Search
            key="search"
            placeholder="输入医生姓名"
            enterButton="查询"
            size="Large"
            onSearch={onSearch}
          />,
          <Button key="refresh" type="primary" onClick={getUsers}>
            刷新
          </Button>,
        ]}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onDelete: handleDelete,
          onSave: handleUpdateRole,
        }}
      />
    </PageContainer>
  );
};

export default UserList;
