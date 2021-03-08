// User adds new user to the system
import { Form, Input, Button, Select, PageHeader } from 'antd';
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
   
      const onFinish = (values: any) => {
        console.log(values);
      };
    
      const onReset = () => {
        form.resetFields();
      };
    
     
    return (
        <>
         <PageHeader
    className="site-page-header"
    title="New User"
    subTitle="Create new user for your organization"
  />
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name={['user', 'firstName']} label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'userPhonenumber']} label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number', type:'number' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'userEmail']} label="Email" rules={[{ required: true, type: 'email', message: 'Please enter your email address'  }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name={['user', 'userRole']} label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
          <Select
            placeholder="Select a role"
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
      </>
    )
}

export default AddUser;