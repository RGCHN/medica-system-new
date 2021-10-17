import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Descriptions, message } from 'antd';
import ProCard from '@ant-design/pro-card';
import { useModel } from 'umi';
import { getUserDetail } from '@/services/api';
import styles from './index.less';
import { ContactsOutlined, ReconciliationOutlined} from '@ant-design/icons';


const selfCenter = () => {
  const { initialState } = useModel('@@initialState')
  const [userData, setUserData] = useState(null);
  const { currentUser } = initialState;

  useEffect(() => {
    if (!currentUser) {
      history.push('/user/login');
      return;
    }
    getUserDetail({
      userID: currentUser.id
    }).then(res => {
      if (res.data.status === 'success') {
        setUserData(res.data.data);
        return;
      }
      message.error(res.data.msg);
      setUserData(null);
    }, err => {
      setUserData(null);
    })
  }, [])


  console.log(userData);
  return (
    <PageContainer>
      {
        userData && (
          <ProCard
            split='vertical'
            bordered
            headerBordered
          >
            <ProCard colSpan="50%">
              <div className={styles.leftContainer} >
                <Avatar size={64} src={currentUser.avatar} alt="avatar" />
                <br/>
                <div>{userData.name}</div>
                <br/>
                <div><ContactsOutlined />  {userData.role}</div>
                <br/>
                <div><ReconciliationOutlined /> {userData.group}</div>
              </div>
            </ProCard>
            <ProCard>
              <br/>
              <Descriptions column={1}>
                <Descriptions.Item label="真实姓名">{userData.realname}</Descriptions.Item>
                <Descriptions.Item label="个性签名">{userData.signature}</Descriptions.Item>
                <Descriptions.Item label="邮箱地址">{userData.email}</Descriptions.Item>
                <Descriptions.Item label="手机号">{userData.phone}</Descriptions.Item>
              </Descriptions>
            </ProCard>
          </ProCard>
        )
      }
    </PageContainer>
  )
}

export default selfCenter;
