import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Button, Dropdown, Menu,Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const data:any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address1: `London, Park Lane no. ${i}`,
    address2: `London, Park Lane no. ${i}`,
    address3: `London, Park Lane no. ${i}`,
    address4: `London, Park Lane no. ${i}`,
    address5: `London, Park Lane no. ${i}`,
    address6: `London, Park Lane no. ${i}`,
  });
}

class Lead extends React.Component {
  state = {
    value: false,
    checkedColumns: [],
    visibleMenuSettings: false,
     columns: [
  {
    title: 'Name',
    dataIndex: 'name',
    
  },
  {
    title: 'Age',
    dataIndex: 'age',

  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address1',
    dataIndex: 'address1',
  },
  {
    title: 'Address2',
    dataIndex: 'address2',
  },
  {
    title: 'Address3',
    dataIndex: 'address3',
  },
  {
    title: 'Address4',
    dataIndex: 'address4',
  },
  {
    title: 'Address5',
    dataIndex: 'address5',
  },
  {
    title: 'Address6',
    dataIndex: 'address6',
  },
],
initialColumns: []
  };

  componentDidMount() {
    this.setState({initialColumns: this.state.columns})
  }

  handleVisibleChange = (flag:any) => {
    this.setState({ visibleMenuSettings: flag });
  };

  onChange = (e:any) => {
    let checkedColumns: any = [];
     checkedColumns = this.state.checkedColumns;
    if(e.target.checked){
      checkedColumns = checkedColumns.filter((id:any) => {return id !== e.target.id})
    }
    else if(!(e.target instanceof HTMLElement)){      
      checkedColumns.push(e.target.id);
    }

  var filtered = this.state.initialColumns;
    for(var i =0;i< checkedColumns.length; i++)
    filtered = filtered.filter((el:any) => {return el.dataIndex !== checkedColumns[i]})
    this.setState({columns: filtered, checkedColumns: checkedColumns})
  }

  render() {
      const menu = (
          <Menu>  
            <Menu.ItemGroup title="Columns" >
              <Menu.Item  key="4"><Checkbox id="age" onChange={this.onChange} defaultChecked>Age</Checkbox></Menu.Item>
              <Menu.Item key="5"><Checkbox id="address" onChange={this.onChange} defaultChecked>Address</Checkbox></Menu.Item>
            </Menu.ItemGroup>
          </Menu>
      );

    return (
      <div>
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visibleMenuSettings}
      >
        <Button>Show/Hide</Button>
      </Dropdown>
        <Table columns={this.state.columns} dataSource={data} scroll={{x:'1800'}}/>
      </div>
    );
  }
}

export default Lead;