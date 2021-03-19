// User adds new user to the system
import { Form, Input, Button, Select, PageHeader, Modal,message  } from 'antd';
import { useEffect, useState } from 'react';
//import {Treeview} from '../treeview/treeview';
import {getRoles, addRole} from '../api/api';

import './addrole.css';
import React from 'react';
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  

const AddRole = ()=>{
  const [responseData,setresponseData] = React.useState([]);
  useEffect(()=>{
    getRoleInfo()    
  },[]);
    {/*-Get user information-*/}
 function getRoleInfo() {
  getRoles().then((response)=> {
    setresponseData(response);
    console.log(response);
  });
}
    const [form] = Form.useForm();
   
      const onFinish = (values: any) => {
        console.log(values.role);
        addRole(values.role).then((resp)=>{
          if(resp.status!=='200') {
            message.error(resp.data.message)
          } else {
            message.success('Role created successfully')
          }
        });
        form.resetFields();
      };
    
      const onReset = () => {
        form.resetFields();
      };
  
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

    return (
        <>
         <PageHeader
    className="site-page-header"
    title="New Role"
  
  />
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name={['role', 'role']} label="Role Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['role', 'reportingTo']} label="Reporting to" rules={[{ required: true, message: 'Please select to whom will be reporting' }]}>
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
      <Modal title={<PageHeader
    className="site-page-header"
    title="Existing Roles"
    
   
  />} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}>
{/* <Treeview data={responseData}/> */}
      </Modal>
      </>
    )
}

export default AddRole;