import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { useState } from 'react';
import './login.css';
 const Loginn = ()=>{
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
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

       
return (
    <>
 
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
        <a  onClick={showModal}><span className="blueColor">Forgot Password?</span></a>
       
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}>
      {
        <>
        <p>Please enter your email address that you have associated. We will send an email link to reset your password</p>
        <Form>
          <Form.Item  label="Enter email">
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