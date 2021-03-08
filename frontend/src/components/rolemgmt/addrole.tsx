// User adds new user to the system
import { Form, Input, Button, Select, PageHeader } from 'antd';
import './addrole.css';
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
const AddRole = ()=>{
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
    title="New Role"
    subTitle="Create new role for your organization"
  />
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name={['role', 'roleName']} label="Role Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['role', 'reportsTo']} label="Reporting to" rules={[{ required: true, message: 'Please select to whom will be reporting' }]}>
          <Select
            placeholder="Select reporting authority"
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={"createRole"}>
            Create Role
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
       
        </Form.Item>
      </Form>
      </>
    )
}

export default AddRole;