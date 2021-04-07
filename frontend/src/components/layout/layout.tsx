import  {  createContext,  ReactNode } from "react";
import { Layout, Menu, Dropdown, Popover } from 'antd';
import {
  SettingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

import { getUser } from '../api/api';
import AddRole from '../rolemgmt/addrole';
import ViewUser from '../usermgmt/viewuser';
import TimeLine from '../timeline/timeline';
import LoginComponent from '../login/login';
import { useProvideAuth, removeRole } from '../common/functions';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import history from '../common/history';
import { getRole } from '../common/functions'
import Mainlead from '../leadmanagement/leadmanagement';
import UpdatePwd from '../usermgmt/updatepwd';
import './layout.css';

const authContext = createContext({});

interface IProps {
  children: ReactNode;
  path?: string;
}

const content = <>LMS Version: 0.1</>

const LayoutWrapper = (props: any) => {

  const { Header, Content, Footer } = Layout;
 
  getUser();
  const menu = (<Menu mode="horizontal" >
    <Menu.Item key="1"><Link to="/">Login</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/roles">Manage Roles</Link></Menu.Item>
    <Menu.Item key="4"><Link to="/viewuser">Manage Users</Link></Menu.Item>
    <Menu.Item key="5"><Link to="/leads">Leads</Link></Menu.Item>
    <Menu.Item key="6"><Link to="/updatepwd">Update Password</Link></Menu.Item>
    <Menu.Item key="7"><Link to='/' onClick={removeRole}>Signout</Link></Menu.Item>
  </Menu>);
  const Headerr = ()=> (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Dropdown overlay={menu} className="goRight">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <span><SettingOutlined /></span>
                </a>
              </Dropdown>

              <Popover content={content} title="About LMS">
                <InfoCircleOutlined style={{ color: "white", fontSize: '15px' }} />

              </Popover>
            </Header>
  )
  return (
    <>
   
      <Layout>
      
        <ProvideAuth>
          <Router history={history}>
            
           
           {Headerr()}
     
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Switch>
                  <PrivateRoute path="/roles">
                    <AddRole />
                  </PrivateRoute>
                  <PrivateRoute path="/viewuser">
                    <ViewUser />
                  </PrivateRoute>
                  <PrivateRoute path="/timeline">
                    <TimeLine />
                  </PrivateRoute>
                  <PrivateRoute path="/leads">
                    <Mainlead />
                  </PrivateRoute>
                  <PrivateRoute path="/updatepwd">
                    <UpdatePwd />
                  </PrivateRoute>
                  <Route path="/">
                    <LoginComponent />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>MIT License - 2021 &copy; Copyrights reserved LMS </Footer>
          </Router>
        </ProvideAuth>
      </Layout>

    </>
  )
}


function ProvideAuth({ children, ...props }: IProps) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}



function PrivateRoute({ children, ...rest }: IProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getRole().length > 0 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default LayoutWrapper;
