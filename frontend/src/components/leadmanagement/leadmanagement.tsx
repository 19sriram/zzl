import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Button, Dropdown, Menu, Checkbox, Modal, PageHeader, Form, Input, InputNumber, Select, Row, Col } from 'antd';
import { AlignLeftOutlined, DownOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const data: any = [];
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
  constructor(props: any) {
    super(props);

  }
  state = {
    value: false,
    checkedColumns: [],
    visibleMenuSettings: false,
    isModalVisible: false,
    activeValue:0,
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
    this.setState({ initialColumns: this.state.columns })
  }

  onValueChange = (e:any)=>console.log(e);
  handleVisibleChange = (flag: any) => {
    this.setState({ visibleMenuSettings: flag });
  };

  onChange = (e: any) => {
    let checkedColumns: any = [];
    checkedColumns = this.state.checkedColumns;
    if (e.target.checked) {
      checkedColumns = checkedColumns.filter((id: any) => { return id !== e.target.id })
    }
    else if (!(e.target instanceof HTMLElement)) {
      checkedColumns.push(e.target.id);
    }

    var filtered = this.state.initialColumns;
    for (var i = 0; i < checkedColumns.length; i++)
      filtered = filtered.filter((el: any) => { return el.dataIndex !== checkedColumns[i] })
    this.setState({ columns: filtered, checkedColumns: checkedColumns })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.ItemGroup title="Columns" >
          <Menu.Item key="4"><Checkbox id="age" onChange={this.onChange} defaultChecked>Age</Checkbox></Menu.Item>
          <Menu.Item key="5"><Checkbox id="address" onChange={this.onChange} defaultChecked>Address</Checkbox></Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );

    //

    const showModal = () => {
      this.setState({
        isModalVisible: true
      })
    };

    const handleOk = () => {
      this.setState({
        isModalVisible: false
      })
    };

    const handleCancel = () => {
      this.setState({
        isModalVisible: false
      })
    };

    const onFinish = (values: any) => {
      console.log(1, values);
    }

    //

    return (
      <div>
        Records:
        <Select
          value={1}
         
          style={{ width: 80, margin: '0 8px' }}
        >
          <Option value="20">20</Option>
          <Option value="50">50</Option>
        </Select>

        <span style={{ float: 'right' }}>
        <Button  type="primary" onClick={showModal.bind(this)} style={{marginRight:'1em'}}>New Lead</Button>
        <Dropdown
          overlay={menu}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visibleMenuSettings}
          
        >
          <Button><AlignLeftOutlined /></Button>
        </Dropdown>
        </span>
        <Table columns={this.state.columns} dataSource={data} scroll={{ x: '1800' }} style={{paddingTop:'1em'}}/>

        <Modal width={1000}
          title={<PageHeader
            className="site-page-header"
            title="New Lead"
            subTitle="Create new lead for your organization"


          />}
          visible={this.state.isModalVisible} onOk={handleOk.bind(this)} onCancel={handleCancel.bind(this)} footer={null}>
          <Form {...layout} name="nest-messages" onFinish={onFinish.bind(this)}>

            <Row gutter={{ xs: 8 }}>
              <Col span={12}>


                <Form.Item name={['lead', 'name']} label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['lead', 'email']} label="Email" rules={[{ type: 'email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['lead', 'leadowner']} label="Lead Owner">
                  <Select
                    value={1}
                    style={{ width: 80, margin: '0 8px' }}
                  >
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['lead', 'designation']} label="Designation" >
                  <Input />
                </Form.Item>

              </Col>
              <Col span={12}>

                <Form.Item name={['lead', 'phonenumber']} label="Phone Number">
                  <Input />
                </Form.Item>
                <Form.Item name={['lead', 'leadsource']} label="Lead Source">
                  <Select
                    value={1}
                    style={{ width: 80, margin: '0 8px' }}
                  >
                    <Option value="facebook">Facebook</Option>
                    <Option value="google">Google</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['lead', 'leadstatus']} label="Lead Status">
                  <Select
                    value={1}
                    style={{ width: 80, margin: '0 8px' }}
                  >
                    <Option value="notsourced">Not Sourced</Option>
                    <Option value="junk">Junk</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['lead', 'Address']} label="Address">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name={['lead', 'leadstate']} label="Lead State">
                  <Select
                    value={1}
                    style={{ width: 80, margin: '0 8px' }}
                  >
                    <Option value="tamilnadu">Tamilnadu</Option>
                    <Option value="karnataka">Karnataka</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className={"createRole"}>
                    Create Lead
          </Button>
                </Form.Item>
              </Col>

            </Row>

          </Form>


        </Modal>
      </div>

    );
  }
}

export default Lead;