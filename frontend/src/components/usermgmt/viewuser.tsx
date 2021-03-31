
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Tag, Button, Divider, Modal, PageHeader, Input, Select, Empty } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  FileAddOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { tagColor, UserInterface, userTypes } from '../common/const';
import { userData } from '../common/dummy';
import AddUser from './adduser';
import './adduser.css';
import { getUser, deleteUser, searchUser, deletedUsers, userStatusChange } from '../api/api';
const { Search } = Input;
const { Option } = Select;

const ViewUser = () => {

  const [userList, setData] = React.useState([UserInterface]);
  const [filterValue, setFilterValue] = React.useState('');
  const [selecteduser, setselectedUser] = React.useState(UserInterface);
  const [activeUser, setActiveUser] = React.useState(false);
  useEffect(() => {
    getUserInfo()
  }, []);

  //const
  const setResponsee = (response:any)=>{
    setData(response);
      setselectedUser(response[0]);
  }

  {/*-Get user information-*/ }
  function getUserInfo() {
    getUser().then((response) => {
      setResponsee(response);
    });

  }
  // search user 
  const onSearch = (value: any) => {
    //console.log(value);
    searchUser(value).then((response) => {
      response.length > 1 ? setData(response) : setData([response]);
    });

  }

  const _deleteUser = (selecteduser: any)=> {
    deleteUser(selecteduser).then(()=>getUserInfo());
  }

  function onuserSelect(filterName: any) {
    let _selectedUser = userList.filter((item: any) => item.firstname === filterName);
    setselectedUser(_selectedUser[0]);
  }

  function onHover(userInfo: any) {
    userInfo.isActive ? setActiveUser(true) : setActiveUser(false)
  }
  let isactiveUser = (selecteduser: any) => userStatusChange({ "email": selecteduser.email, "isActive": selecteduser.isActive }).then(() => getUserInfo());


  // on user select filter dropdown
  const onuserFilterChange = (values: any) => {
    setFilterValue(values);
    if (values === 'deleteduser') {
      deletedUsers().then((response) => { setData(response); setselectedUser(response[0]); });
    } else if (values === 'all') {
      getUserInfo();
    } else if (values === 'activeuser') {
      getUser('isActive=true').then((response) => { setData(response); setselectedUser(response[0]); });
    } else if (values === 'inactiveuser') {
      getUser('isActive=false').then((response) => { setData(response); setselectedUser(response[0]); });
    }
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
  console.log(userList)
  return (
    
    <>
    <PageHeader title={'USERS'}/>
    {
      
      userList.length>1?
      <div>
      <Row>
        <Col span={14}><Card title="Users List" extra={<>
          <span style={{ marginRight: '10px' }}>Total: {userList.length}</span>
          <Select placeholder="Select user type" defaultValue={'all'} style={{ minWidth: '150px' }} onSelect={(values) => onuserFilterChange(values)}>
            <Option value="all">All</Option>
            <Option value="activeuser">Active User</Option>
            <Option value="inactiveuser">Inactive User</Option>
            <Option value="deleteduser">Deleted User</Option>
          </Select>
          <Search placeholder="Search user" onSearch={onSearch}
            style={{ width: 150, marginRight: '1em' }} />

          <Button type="primary" onClick={showModal}>New user</Button></>
        }>
          <Card type="inner" id="userCardBody">
            { userList && (
              userList.map((userInfo: { firstname: string; lastname: string; role: any }, index: React.Key | null | undefined) =>
                <span key={index} className={'userCard'} onClick={() => onuserSelect(userInfo.firstname)} onMouseOver={() => onHover(userInfo)}>
                  <b>{userInfo.firstname + ' ' + userInfo.lastname}</b>
                  <Tag color={tagColor[userInfo.role]}>{userInfo.role}</Tag>

                  <Divider />
                </span>
              ))}
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
              { filterValue !== 'deleteduser' ? 
              <span className='delteIcon' onClick={()=>_deleteUser(selecteduser)}><DeleteOutlined id="deleteiconc" /></span>
              : ''
              }
              <div>
                <p><PhoneOutlined /> {selecteduser.mobile}</p>
                <p><MailOutlined /> {selecteduser.email}</p>
                <p><FileAddOutlined /> {selecteduser.createdOn}</p>

                <p>{filterValue !== 'deleteduser' ? <>{selecteduser.isActive ? <Button type="primary" danger onClick={() => isactiveUser(selecteduser)}>Deactivate user</Button> : <Button type="primary" onClick={() => isactiveUser(selecteduser)}>Reactivate user</Button>}</> : ''}</p>

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

        />} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <AddUser isCreated={() => setIsModalVisible(false)} isCancelled={() => setIsModalVisible(false)} getUserInfo={() => getUserInfo()} />
        </Modal>
      </>
    </div>:
    <Empty/>
    }
   
    </>
  )
};
export default ViewUser;

{/*
Todo:  
1. sending only email with options deletes other values
2. edit user option to be enabled
*/}