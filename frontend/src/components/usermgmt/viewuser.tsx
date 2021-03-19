
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Tag, Button, Divider, Modal, PageHeader, Input, Select } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import {tagColor, UserInterface, userTypes} from '../common/const';
import {userData} from '../common/dummy';
import './adduser.css';
import AddUser from './adduser';
import { getUser, deleteUser, } from '../api/api';
const { Search } = Input;
const { Option } = Select;

const ViewUser = () => {
  
  const [userList, setData] = React.useState([UserInterface]);
  const [selecteduser, setselectedUser] = React.useState(UserInterface);
  const [activeUser,setActiveUser]= React.useState(false);
  useEffect(() => {
    getUserInfo()
  },[]);
  {/*-Get user information-*/}
 function getUserInfo() {
  getUser().then((response)=> {
    setData(response);
    setselectedUser(response[0]);
  });
  
 }
 // search user 
 const onSearch = (value: any) => console.log(value);

  function onuserSelect(filterName: any) {
    let _selectedUser = userList.filter((item:any) => item.firstname === filterName);
    setselectedUser(_selectedUser[0]);
  }
  
  function onHover(userInfo:any) {
    userInfo.isActive?setActiveUser(true):setActiveUser(false)
  }
  function isactiveUser(selecteduser:any){
    if(selecteduser.isActive) {
      console.log('deactivating', selecteduser.email);
      deleteUser(selecteduser.email).then(()=>getUserInfo());
    } else {
      console.log('activating');
    }

  }

  // on user select filter dropdown
  const onuserFilterChange = (values:any)=>{
    console.log(values);
  }
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
    <div>
      <Row>
        <Col span={14}><Card title="Users List" extra={<>
        
          <Select placeholder="Select user type" defaultValue={'all'} style={{minWidth: '150px'}} onSelect={(values)=>onuserFilterChange(values)}>

         
              <Option value="all">All</Option>
              <Option value="activeuser">Active User</Option>
              <Option value="inactiveuser">Inactive User</Option>
              <Option value="deleteduser">Deleted User</Option>
            </Select>
        <Search placeholder="Search user" onSearch={onSearch} 
        style={{ width: 150,marginRight: '1em' }} />
   
        <Button type="primary" onClick={showModal}>New user</Button></>
        }>
          <Card type="inner" id="userCardBody">
            { 
              userList.map((userInfo: { firstname: string; lastname: string; role: any },index: React.Key | null | undefined) =>
                <span key={index} className={'userCard'} onClick={() => onuserSelect(userInfo.firstname)} onMouseOver={()=>onHover(userInfo)}>
                  <b>{userInfo.firstname + ' ' + userInfo.lastname}</b>
                  <Tag color={tagColor[userInfo.role]}>{userInfo.role}</Tag>
                 
                  <Divider />
                </span>
              )}
          </Card>
        </Card>
        </Col>

        {/* RIGHT SIDE  */}
        <Col span={10}>
          <Card type="inner" >
            <div>
            <Avatar size={40} style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '1.5em' }}>{(selecteduser.firstname).toUpperCase().charAt(0)}</Avatar>

              <span className={'fontBig'}>{selecteduser.firstname + ' ' + selecteduser.lastname}</span><span><Tag color={tagColor[selecteduser.role]}>{selecteduser.role}</Tag>
              </span>
              <div>
                <p><PhoneOutlined /> {selecteduser.phonenumber}</p>
                <p><MailOutlined /> {selecteduser.email}</p>
                <p><FileAddOutlined /> {selecteduser.createdOn}</p>
                <p>{selecteduser.isActive?<Button type="primary" danger onClick={()=>isactiveUser(selecteduser)}>Delete user</Button>:<Button type="primary" onClick={()=>isactiveUser(selecteduser)}>Reactivate user</Button>}</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
<>
<Modal title={<PageHeader
    className="site-page-header"
    title="New User"
    subTitle="Create new user for your organization"
   
  />} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}>
<AddUser isCreated={()=>setIsModalVisible(false)} isCancelled={()=>setIsModalVisible(false)} getUserInfo={()=>getUserInfo()}/>
      </Modal>
</>
    </div>
  )
};
export default ViewUser;

{/*
Todo:  
1. integrate backend for the table api filter, search
2. To check for delete option in user and deactivate option
3. sending only email with options deletes other values
*/}