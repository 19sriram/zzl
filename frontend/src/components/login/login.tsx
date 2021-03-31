import { Form, Input, Button, Checkbox, Modal, message, Col, Row } from 'antd';
import React, { useState } from 'react';
import { role, getRole } from '../common/functions';
import { checkUser, sendpassword } from '../api/api';
import './login.css';
const Loginn = () => {
  //
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values: any) => {
    checkUser(values).then((rep) => {
      if (rep.data.status !== 200) {
        message.error('Error ' + rep.data.message)
      }
      role(rep.data.role);
      console.log(getRole())
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onEmailSend = (value:any)=>{
    console.log(value);
    sendpassword(value.email).then((response)=>{
      if(response?.data.status !== 200) {
        message.error(response?.data.message)
      } else {
        message.success('link sent successfully');
      }

    })
  }



  return (
    <>
      <Row  justify="center" align="middle" style={{minHeight: '40vh'}}>
        <Col span={12}>
          <img className="logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
          <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <a onClick={showModal}><span className="blueColor">Forgot Password?</span></a>

        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
        </Col>
      </Row>
      
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
        {
          <>
            <p>Please enter your email address that you have associated. We will send an email link to reset your password</p>
            <Form onFinish={onEmailSend}>
              <Form.Item label="Enter email" name={ 'email'}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Submit
        </Button>

              </Form.Item>
            </Form>
          </>
        }
      </Modal>
    </>
  )
}

export default Loginn;