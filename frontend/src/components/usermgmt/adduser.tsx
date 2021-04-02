// User adds new user to the system
import { Form, Input, Button, Select, message } from 'antd';
import { addUser } from '../api/api';
import './adduser.css';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddUser = (props: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addUser(values.user).then((response)=> {
      if (response.result == 'Success') {
        props.getUserInfo();
        props.isCreated();
        message.success('User created successfully');
      } else {
        message.error(response.message);
      }
    });

  };

  const onReset = () => {
    form.resetFields();
    props.isCancelled();
  };


  return (
    <>

      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name={['user', 'firstname']} label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastname']} label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'mobile']} label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email', message: 'Please enter your email address' }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['user', 'role']} label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
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
            Cancel
          </Button>

        </Form.Item>
      </Form>
    </>
  )
}

export default AddUser;