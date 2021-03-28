import { Layout, Menu, Breadcrumb, Timeline, Dropdown } from 'antd';
// import { Component, useEffect } from 'react';
import React, {useContext, createContext, useState } from 'react';
import {
  SettingOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';
import './layout.css';
import { getUser } from '../api/api';
import AddUser from '../usermgmt/adduser';
import AddRole from '../rolemgmt/addrole';
import ViewUser from '../usermgmt/viewuser';
import TimeLine from '../timeline/timeline';
import Loginn from '../login/login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Mainlead from '../leadmanagement/leadmanagement';
import UpdatePwd from '../usermgmt/updatepwd';


const LayoutWrapper = () => {

  
  const { Header, Content, Footer } = Layout;
  getUser();
  const menu = (<Menu mode="horizontal" >
    <Menu.Item key="1"><Link to="/">Login</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/roles">Manage Roles</Link></Menu.Item>
    <Menu.Item key="4"><Link to="/viewuser">Manage Users</Link></Menu.Item>
    <Menu.Item key="5"><Link to="/leads">Leads</Link></Menu.Item>
    <Menu.Item key="6"><Link to="/updatepwd">Update Password</Link></Menu.Item>
  </Menu>);
  return (
    <>
      <Layout>
        <Router>

          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Dropdown overlay={menu} className="goRight">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <span><SettingOutlined style={{ fontSize: '20px' }} /></span>
              </a>
            </Dropdown>
            <InfoCircleOutlined style={{color: "white", fontSize: '15px'}}/>

          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
           
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              <Switch>
              
                <Route path="/roles">
                  <AddRole />
                </Route>
                <Route path="/viewuser">
                  <ViewUser />
                
                </Route>
                <Route path="/timeline">
                  <TimeLine />
                </Route>
                <Route path="/leads">
                  <Mainlead/>
                </Route>
                <Route path="/updatepwd">
                  <UpdatePwd/>
                </Route>
                <Route path="/">
                  <Loginn />
                </Route>
           
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MIT License - 2021 &copy; </Footer>
        </Router>
      </Layout>
    </>

  )
  
}

export default LayoutWrapper;