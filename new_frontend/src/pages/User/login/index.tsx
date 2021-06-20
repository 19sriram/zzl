// TODO:

// 1. Error handling


import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs, Modal } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, useParams } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import { SendCode, VerifyCode, ChangePassword } from '@/services/login'
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
  forgotPassword?: boolean;
};


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting, forgotPassword } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState<string>('account');
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(false);
  const [sendCode, setsendCode] = useState(false);
  const [verifyCodeBody, setverifyCodeBody] = useState(false);
  const [tempUser, settempUser] = useState('');
  const intl = useIntl();

  {/** 
  Modal funtion - dxd.company
*/}

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  // calling forgotPassword
  const handleForgotPassword = async (e: any) => {
    let response: any = await SendCode(e);
    console.log(response);

    if (response.data.status === 200) {
      settempUser(e.userName);
      setForgotPasswordMessage(false);
      setsendCode(true);
    } else {
      console.error(response.data.message);
    }
  
  };

  const handleCodeVerification = async (values: LoginParamsType) => {
    let response: any = await VerifyCode(tempUser, values.codeNumber);
    if (response.status == 200) {
      setsendCode(false)
      setverifyCodeBody(true)
    }
  };

  const handlePasswordChange = async (values: LoginParamsType) => {
    let response: any = await ChangePassword(tempUser, values.password);
    if (response.status == 200) {
      console.log('changed password successfully');
      setIsModalVisible(false);
    }
  }

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '账户密码登录',
            })}
          />
          {/* <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: 'pages.login.phoneLogin.tab',
              defaultMessage: '手机号登录',
            })}
          /> */}
          {/* {dxd.company phone login tab} */}
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误（admin/ant.design)',
            })}
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
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
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder={intl.formatMessage({
                id: 'pages.login.phoneNumber.placeholder',
                defaultMessage: '手机号',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.required"
                      defaultMessage="请输入手机号！"
                    />
                  ),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.invalid"
                      defaultMessage="手机号格式错误！"
                    />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.captcha.placeholder',
                defaultMessage: '请输入验证码',
              })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: '获取验证码',
                  })}`;
                }
                return intl.formatMessage({
                  id: 'pages.login.phoneLogin.getVerificationCode',
                  defaultMessage: '获取验证码',
                });
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="请输入验证码！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (mobile) => {
                const result = await getFakeCaptcha(mobile);
                if (result === false) {
                  return;
                }
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          {/* remember me - dxd.company */}

          {/* <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </ProFormCheckbox> */}
          <a
            style={{
              float: 'left',
            }}
          >
            <p id="pages.login.forgotPassword" onClick={() => { setIsModalVisible(true); setForgotPasswordMessage(true) }}>{'Forgot password?'}</p>
          </a>
        </div>
      </ProForm>
      {/* <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space> */}

      <Modal title="Reset your password" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        {forgotPasswordMessage && <>
          Enter your username / phone number
          <ProForm
            id="submit "
            submitter={{
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: forgotPassword,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={(values) => {
              handleForgotPassword(values as LoginParamsType);
              return Promise.resolve();
            }}
          >
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Enter your username',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter username"
                    />
                  ),
                },
              ]}

            />
          </ProForm>
        </>
        }
        {/* Verify code with backend sent to email / phone number */}
        {sendCode &&
          <>
            <ProForm
              id="submit "
              submitter={{
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: forgotPassword,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={(values) => {
                handleCodeVerification(values as LoginParamsType);
                return Promise.resolve();
              }}
            >
              <p>We have sent verification code to your phone number and email id</p>
              <br />
              <ProFormText
                name="codeNumber"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'Enter code',
                  defaultMessage: 'Enter code',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="code is needed"
                        defaultMessage="Kindly enter code sent"
                      />
                    ),
                  },
                ]}
              />
            </ProForm>
          </>

        }

        {/* Set password and new password */}
        {
          verifyCodeBody &&
          <>
            <ProForm
              id="submit"
              submitter={{
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={(values) => {
                handlePasswordChange(values as LoginParamsType);
                return Promise.resolve();
              }}
            >
              <p>Enter new password</p>
              <br />
              <ProFormText
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'Enter new password',
                  defaultMessage: 'Enter new password',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="password is needed"
                        defaultMessage="Kindly enter password of your choice"
                      />
                    ),
                  },
                ]}
              />
            </ProForm>
          </>

        }
      </Modal>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  forgotPassword: loading.effects['login/login']
}))(Login);
