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
  useEffect(() => {
    setData(userData);
    setselectedUser(userList[0]);
  },[]);
 

  function onuserSelect(filterName: any) {
    let _selectedUser = userList.filter(item => item.firstname === filterName);
    setselectedUser(_selectedUser[0]);
  }
  return (
    <div>
      <Row>
        <Col span={8}><Card title="Users List" extra={<a href="/">    <Button type="primary">New user</Button>
        </a>}>
          <Card type="inner">
            {
              userList.map((userInfo,index) =>
                <span key={index} className={''} onClick={() => onuserSelect(userInfo.firstname)}>
                  <b>{userInfo.firstname + ' ' + userInfo.lastname}</b>
                  <Tag color={tagColor[userInfo.role]}>{userInfo.role}</Tag>
                  <br />
                  <br />
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
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  )
};
export default ViewUser;