import { Card, Col, Row, Avatar, Tag, Button } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import './adduser.css';
import React, { useEffect } from 'react';


const userData = [{
  firstname: "John",
  "lastname": "Doe",
  "email": "test@test.com",
  "createdOn": "10/03/2021",
  "isActive": true,
  "role": "super admin"
},
{
  firstname: "Jason",
  "lastname": "Bourne",
  "email": "test@test.com2",
  "createdOn": "11/03/2021",
  "isActive": false,
  "role": "admin"
}] as any;


const ViewUser = () => {
  const [userList, setData] = React.useState([{
    firstname: '',
    lastname: '',
    email: '',
    createdOn: '',
    isActive: '',
    role: ''
  }]);
  useEffect(() => {
    setData(userData);
  })
  const roleColorMap: any = {
    superadmin: "purple",
    admin: "orange"
  }


  return (
    <div>
      <Row>
        <Col span={8}><Card title="Users List" extra={<a href="/">    <Button type="primary">New user</Button>
        </a>}>

          <Card type="inner">
            {

              userList.map(item => {
                <div>{item.firstname}</div>
              })
            }
            {console.log(userList.map(item => item.firstname))}

            {/* <span className={''}>
              test
              <b>{userInfo.firstname+userInfo.lastname}</b>
              <Tag color={roleColorMap[userInfo.role]}>{}</Tag>
              <br />
              <span>CEO</span>
            </span> */}

          </Card>

        </Card>
        </Col>

        {/* RIGHT SIDE  */}
        <Col span={14}>

          <Card type="inner"  >
            <div>
              <span className={'fontBig'}>John Doe</span><span><Tag color="purple">Super Admin</Tag></span>
              <div>
                <p><PhoneOutlined /> 12345678900</p>
                <p><MailOutlined /> test@test.com</p>
                <p><FileAddOutlined /> 10/03/2020</p>
              </div>
            </div>
          </Card>

        </Col>
      </Row>

    </div>
  )
};
export default ViewUser;