import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Dropdown, Menu, Checkbox, Modal, PageHeader, Form, Input, Select, Row, Col } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const data: any = [];

for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    email: `test@test.commmmmm`,
    leadsource: `London, Park Lane no. ${i}`,
    leadstatus: `London, Park Lane no. ${i}`,
    designation: `London, Park Lane no. ${i}`,
    address: `London, Park Lane no. ${i}`,
    leadstate: `London, Park Lane no. ${i}`,
    leadowner: `London, Park Lane no. ${i}`,
    phonenumber: `London, Park Lane no. ${i}`,
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
    activeValue: 0,
    columnTitle: [],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',

      },
      {
        title: 'E-mail',
        dataIndex: 'email',

      },
      {
        title: 'Lead Owner',
        dataIndex: 'leadowner',
      },
      {
        title: 'Designation',
        dataIndex: 'designation',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phonenumber',
      },
      {
        title: 'Lead Source',
        dataIndex: 'leadsource',
      },
      {
        title: 'Lead Status',
        dataIndex: 'leadstatus',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Lead State',
        dataIndex: 'leadstate',
      },
    ],
    initialColumns: []
  };

  componentDidMount() {
    this.setState({ initialColumns: this.state.columns });
    let headers = this.state.columns.map(item => item.title);
    setTimeout(() => {
      this.setState({ columnTitle: headers });
    }, 100);

  }

  onValueChange = (e: any) => console.log(e);

  handleVisibleChange = (flag: any) => this.setState({ visibleMenuSettings: flag })

  onChange = (e: any) => {
    let checkedColumns: any = [];
    checkedColumns = this.state.checkedColumns;
    if (e.target.checked) {
      checkedColumns = checkedColumns.filter((id: any) => { return id !== e.target.id })
    }
    else if (!(e.target instanceof HTMLElement)) {
      checkedColumns.push(e.target.id);
    }

    let filtered = this.state.initialColumns;
    for (let i = 0; i < checkedColumns.length; i++)
      filtered = filtered.filter((el: any) => { return el.dataIndex !== checkedColumns[i] })
    this.setState({ columns: filtered, checkedColumns: checkedColumns })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.ItemGroup title="Columns" >
          {this.state.columnTitle.map((item: any, index) => {
            <Menu.Item key={index}><Checkbox id={item.toLowerCase()} onChange={this.onChange} defaultChecked>{item}</Checkbox></Menu.Item>
          }
          )}
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
          <Button type="primary" onClick={showModal.bind(this)} style={{ marginRight: '1em' }}>New Lead</Button>
          <Dropdown
            overlay={menu}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visibleMenuSettings}

          >
            <Button><AlignLeftOutlined /></Button>
          </Dropdown>
        </span>
        <Table columns={this.state.columns} dataSource={data} scroll={{ x: '1800' }} style={{ paddingTop: '1em' }} />

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