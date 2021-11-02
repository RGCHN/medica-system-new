import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, NavLink, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { register } from '@/services/api';
import logo from '../assets/image/logo.svg';
import styles from './index.less';

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const intl = useIntl();

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      const msg = await register({ ...values });
      if (msg.data.status === 'success') {
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.login.registerSuccess',
          defaultMessage: '注册成功！',
        });
        message.success(defaultRegisterSuccessMessage);
        history.push('/login');
        return;
      }

      const defaultRegisterFailMessage = intl.formatMessage({
        id: 'pages.login.registerFail',
        defaultMessage: '注册失败！',
      });
      message.error(`${defaultRegisterFailMessage}！${JSON.stringify(msg.data.username[0])}`);
    } catch (error) {
      const defaultRegisterFailMessage = intl.formatMessage({
        id: 'pages.login.registerFail',
        defaultMessage: '注册失败！',
      });
      message.error(defaultRegisterFailMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>脑卒中辅助诊疗系统</span>
            </Link>
          </div>
          <div className={styles.desc} />
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.register',
                  defaultMessage: '注册',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <ProFormText
              name="realname"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.realname.placeholder',
                defaultMessage: '真实姓名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.realname.required"
                      defaultMessage="请输入真实姓名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.email',
                defaultMessage: '邮箱',
              })}
            />
            <ProFormText
              name="phone"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.phone',
                defaultMessage: '手机号',
              })}
            />
            <ProFormText
              name="signature"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.signature',
                defaultMessage: '签名',
              })}
            />
            <ProFormText
              name="group"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.group',
                defaultMessage: '科室',
              })}
            />
            <div
              style={{
                paddingBottom: 48,
              }}
            >
              <NavLink
                style={{
                  float: 'right',
                }}
                to="/user/Login"
              >
                <FormattedMessage id="pages.login.loginAccount" defaultMessage="已有账号，去登录" />
              </NavLink>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
