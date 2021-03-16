
import React, { useEffect } from 'react';
import { Card, Col, Row, Avatar, Tag, Button, Divider } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import {tagColor} from '../common/const';
import {userData} from '../common/dummy';
import './adduser.css';

const ViewUser = () => {
  const [userList, setData] = React.useState([{
    firstname: '',
    lastname: '',
    email: '',
    createdOn: '',
    isActive: '',
    role: '',
    phonenumber: ''
  }]);
  const [selecteduser, setselectedUser] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    createdOn: '',
    isActive: '',
    role: '',
    phonenumber: '',
  });
  const [activeUser,setActiveUser]= React.useState(false);
  useEffect(() => {
    setData(userData);
    setselectedUser(userData[0]);
  },[]);
 

  function onuserSelect(filterName: any) {
    let _selectedUser = userList.filter(item => item.firstname === filterName);
    setselectedUser(_selectedUser[0]);
  }
  function onHover(userInfo:any) {
    userInfo.isActive?setActiveUser(true):setActiveUser(false)
  }
  function isactiveUser(selecteduser:any){
    selecteduser.isActive?console.error('deactivating'):console.log('activating')
  }
  return (
    <div>
      <Row>
        <Col span={8}><Card title="Users List" extra={<a href="/">    <Button type="primary">New user</Button>
        </a>}>
          <Card type="inner">
            {
              userList.map((userInfo,index) =>
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
        <Col span={14}>
          <Card type="inner"  >
            <div>
              <span className={'fontBig'}>{selecteduser.firstname + ' ' + selecteduser.lastname}</span><span><Tag color={tagColor[selecteduser.role]}>{selecteduser.role}</Tag>
              </span>
              <div>
                <p><PhoneOutlined /> {selecteduser.phonenumber}</p>
                <p><MailOutlined /> {selecteduser.email}</p>
                <p><FileAddOutlined /> {selecteduser.createdOn}</p>
                <p>{selecteduser.isActive?<Button type="primary" danger onClick={()=>isactiveUser(selecteduser)}>Deactivate user</Button>:<Button type="primary" onClick={()=>isactiveUser(selecteduser)}>Reactivate user</Button>}</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  )
};
export default ViewUser;

{/*
Todo:  
1. Add filter to filter out active users and other users
2. To provide dropdown at top of table 
3. To activate and deactivate user with the value passed
*/}