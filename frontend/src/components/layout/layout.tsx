import { Layout, Menu, Breadcrumb, Timeline } from 'antd';
// import { Component, useEffect } from 'react';
import './layout.css';
 import {getUser} from '../api/api';
import AddUser from '../usermgmt/adduser';
import AddRole from '../rolemgmt/addrole';
import Treeview from '../treeview/treeview';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const LayoutWrapper= ()=> {
  const { Header, Content, Footer } = Layout;
  getUser();
  return (
//     <>
//      <Layout>
// <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
// <div className="logo" />
// <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
// <Menu.Item key="1">nav 1</Menu.Item>
// <Menu.Item key="2">nav 2</Menu.Item>
// <Menu.Item key="3">nav 3</Menu.Item>
// </Menu>
// </Header>
// <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
// <Breadcrumb style={{ margin: '16px 0' }}>
// <Breadcrumb.Item>Home</Breadcrumb.Item>
// <Breadcrumb.Item>List</Breadcrumb.Item>
// <Breadcrumb.Item>App</Breadcrumb.Item>
// </Breadcrumb>
// <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
// <AddUser/>
// {/* <AddRole/> */}
// {/* <Treeview/> */}
// </div>
// </Content>
// <Footer style={{ textAlign: 'center' }}>Footer ZZL</Footer>
// </Layout>
//     </>
<>
<Router>
 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
 <Menu.Item key="1"><Link to="/">Users</Link></Menu.Item>
 <Menu.Item key="2"><Link to="/roles">Roles</Link></Menu.Item>
 <Menu.Item key="3"><Link to="/hierarchy">Hierarchy</Link></Menu.Item>
 </Menu>
      <div>
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
             <Content className="site-layout" style={{ padding: '0 0px', marginTop: 64 }}>

        <Switch>
          <Route path="/hierarchy">
            <Treeview />
          </Route>
          <Route path="/roles">
            <AddRole />
          </Route>
          <Route path="/">
            <AddUser />
          </Route>
        </Switch>
        </Content>
      </div>
    </Router>
</>
)
}

export default LayoutWrapper;