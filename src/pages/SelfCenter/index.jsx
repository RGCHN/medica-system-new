import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Descriptions, message } from 'antd';
import ProCard from '@ant-design/pro-card';
import { useModel, useIntl } from 'umi';
import { getUserDetail } from '@/services/api';
import styles from './index.less';
import { ContactsOutlined, ReconciliationOutlined, SolutionOutlined } from '@ant-design/icons';

const SelfCenter = () => {
  const { initialState } = useModel('@@initialState');
  const [userData, setUserData] = useState(null);
  const { currentUser } = initialState;
  const intl = useIntl();

  useEffect(() => {
    if (!currentUser) {
      history.push('/user/login');
      return;
    }
    getUserDetail({
      userID: currentUser.id,
    }).then(
      (res) => {
        if (res.data.status === 'success') {
          setUserData(res.data.data);
          return;
        }
        message.error(res.data.msg);
        setUserData(null);
      },
      (err) => {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'app.error.network',
          defaultMessage: '网络连接错误！',
        });
        message.error(defaultLoginFailureMessage);
        setUserData(null);
        console.log(err);
      },
    );
  }, []);

  return (
    <PageContainer>
      {userData && (
        <ProCard split="vertical" bordered headerBordered>
          <ProCard colSpan="50%">
            <div className={styles.leftContainer}>
              <Avatar size={64} src={currentUser.avatar} alt="avatar" />
              <br />
              <div>
                <SolutionOutlined />
                {userData.name}
              </div>
              <br />
              <div>
                <ContactsOutlined /> {userData.role}
              </div>
              <br />
              <div>
                <ReconciliationOutlined /> {userData.group}
              </div>
            </div>
          </ProCard>
          <ProCard>
            <br />
            <Descriptions column={1}>
              <Descriptions.Item label="真实姓名">{userData.realname}</Descriptions.Item>
              <Descriptions.Item label="个性签名">{userData.signature}</Descriptions.Item>
              <Descriptions.Item label="邮箱地址">{userData.email}</Descriptions.Item>
              <Descriptions.Item label="手机号">{userData.phone}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </ProCard>
      )}
    </PageContainer>
  );
};

export default SelfCenter;
