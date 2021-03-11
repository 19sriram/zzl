import { Card, Col, Row, Avatar, Tag, Button } from 'antd';

import './adduser.css';

const ViewUser = ()=>{
    return (
        <div>
<Row>
<Col span={8}><Card title="Users List" extra={<a href="/">    <Button type="primary">New user</Button>
</a>}>
    <Card type="inner">
        <div>
    {/* <Avatar style={{ backgroundColor: '#87d068' }}>C</Avatar> */}
    </div>
    <span className={'fontBig'}><b>John Doe</b>       <Tag color="purple">Super Admin</Tag><br/>
<span>CEO</span></span>
        <br/>
 
    
     
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      
    >
   <span className={'fontBig'}><b>Jason Bourne</b>       <Tag color="orange">Admin</Tag><br/>
<span>Manager</span></span>
    </Card>
  </Card>
  </Col>
  
  <Col span={14}>

  <Card type="inner"  >
    {"test"}
    </Card>
   
  </Col>
  </Row>
            
        </div>
    )
};
export default ViewUser;