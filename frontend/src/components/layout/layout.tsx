import { Layout, Menu, Breadcrumb, Timeline } from 'antd';
// import { Component, useEffect } from 'react';
import './layout.css';
 import {getUser} from '../api/api';
import AddUser from '../usermgmt/adduser';
import AddRole from '../rolemgmt/addrole';
import Treeview from '../treeview/treeview';
import ViewUser from '../usermgmt/viewuser';
import TimeLine from '../timeline/timeline';
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
    <>
     <Layout>
     <Router>

<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
<div className="logo" />
 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
 <Menu.Item key="1"><Link to="/">Add Users</Link></Menu.Item>
 <Menu.Item key="2"><Link to="/roles">Add Roles</Link></Menu.Item>
 <Menu.Item key="3"><Link to="/hierarchy">Hierarchy</Link></Menu.Item>
 <Menu.Item key="4"><Link to="/viewuser">View User</Link></Menu.Item>
 </Menu>
</Header>
<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
{/* <Breadcrumb style={{ margin: '16px 0' }}>
<Breadcrumb.Item>Home</Breadcrumb.Item>
<Breadcrumb.Item>List</Breadcrumb.Item>
<Breadcrumb.Item>App</Breadcrumb.Item>
</Breadcrumb> */}
<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
<Switch>
          <Route path="/hierarchy">
            <Treeview />
          </Route>
          <Route path="/roles">
            <AddRole />
          </Route>
          <Route path="/viewuser">
            <ViewUser />
          </Route>
          <Route path="/timeline">
            <TimeLine />
          </Route>
          <Route path="/">
            <AddUser />
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