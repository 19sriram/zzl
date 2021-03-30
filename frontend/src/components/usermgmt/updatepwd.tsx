import  { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Modal, Input, Button, message} from 'antd';
import {changepassword} from '../api/api';

const UpdatePwd = () =>{
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
      };
      
    const history = useHistory();
    //
  const [isModalVisible, setIsModalVisible] = useState(true);

  const InitialValue = {email:'zx@cl.om'};
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  const onFinish = (values: any) => {
    
 changepassword(values.email,values.password).then((response)=>{
     if(response?.data.status !== 200) {
        message.error(response?.data.message)
     } else {
        message.success('password changed');
    }

 });
  
   history.push('/login')
  };

  //

    return (
        <Modal title={'Change Password'} visible={isModalVisible}  onCancel={handleCancel} footer={null}>
         <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={InitialValue}>
        <Form.Item name={[ 'email']} label="Username"  rules={[{ required: false, message: '' }]}>
          <Input  disabled defaultValue={"2"}/>
        </Form.Item>
        <Form.Item name={[ 'password']} label="New Password" rules={[{ required: true, message: 'Enter your new password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={"createRole"}>
            Change Password
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>

        </Form.Item>
      </Form>
          </Modal>
    )
}

export default UpdatePwd;