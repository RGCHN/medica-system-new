import React, { useState, useCallback, useEffect } from 'react';
import { Button, Input, Radio, Space, Table, message } from "antd";
import { PageContainer } from '@ant-design/pro-layout';

import { getUserList } from '@/services/api';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [filteredInfo, setFilterInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [selectionType, setSelectionType] = useState(null);

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key:'name'
    },
    {
      title: '权限',
      dataIndex: 'role',
      key:'role'
    },
    {
      title: '操作',
      key:'action',
      render: record => (
        <Space size="middle">
          <Button onClick={ () => {goUserEdit(record.id) }}>编辑</Button>
          <Button onClick={ () => {handleDelete(record.id)}}>删除</Button>
        </Space>
      ),
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleSearch = useCallback(() => {
    const resList = userData.filter( item => item.name === value);
    setUserData(resList);
  }, [userData])

  const goUserEdit = userID => {
  }

  const handleDelete = recordId => {

  }

  const handleChange = () => {

  }

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
      <div className="account-table-container ml-5 mt-3">
        <div className="search-bar d-flex ai-center">
          <div>账号总览 <span style={{fontWeight:"bold", color:'#52c51a'}}>{ userData.length }</span> 人</div>
          <Input.Search className="search-input ml-3" placeholder="查找姓名" onSearch={handleSearch} />
        </div>
        <div className="account-table">
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value)
            }}
            value={selectionType}
          />
          <Table rowSelection={{
            type: selectionType,
            ...rowSelection,
          }} columns={column} dataSource={userData} onChange={handleChange}
                 pagination = {{position:['bottomCenter']}}/>

        </div>
      </div>
    </PageContainer>
  )
}

export default UserList;


