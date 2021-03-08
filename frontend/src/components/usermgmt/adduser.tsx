// User adds new user to the system
import { Form, Input, Button, Select } from 'antd';
import './adduser.css';
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
const AddUser = ()=>{
    const [form] = Form.useForm();
    const onGenderChange = (value: string) => {
        switch (value) {
          case 'male':
            form.setFieldsValue({ note: 'Hi, man!' });
            return;
          case 'female':
            form.setFieldsValue({ note: 'Hi, lady!' });
            return;
          case 'other':
            form.setFieldsValue({ note: 'Hi there!' });
        }
      };
      const onFinish = (values: any) => {
        console.log(values);
      };
    
      const onReset = () => {
        form.resetFields();
      };
    
     
    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name={['user', 'firstName']} label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'userEmail']} label="Email" rules={[{ required: true, type: 'email'  }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['user', 'userRole']} label="Role" rules={[{ required: true }]}>
          <Select
            placeholder="Select a role"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
            <Option value="executive">Executive</Option>
          </Select>
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={"createUser"}>
            Create User
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
       
        </Form.Item>
      </Form>
    )
}

export default AddUser;