import { Table, Button, Modal } from 'antd';
import { useState } from 'react';
import { LeadData } from '../common/dummy';

import NewLead from './newlead';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Address',
        dataIndex: 'address1',
        key: 'address1',
    },
    {
        title: 'Address',
        dataIndex: 'address2',
        key: 'address2',
    },
    {
        title: 'Address',
        dataIndex: 'address3',
        key: 'address3',
    },
    {
        title: 'Address',
        dataIndex: 'address4',
        key: 'address4',
    },
    {
        title: 'Address',
        dataIndex: 'address5',
        key: 'address5',
    },
    {
        title: 'Address',
        dataIndex: 'address6',
        key: 'address6',
    },
];

const Mainlead = () => {

    //
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //

    return (
        <>
            <span className="goRight">
                <Button type="primary" onClick={showModal}>
                    Create Lead
          </Button>
            </span>

            <Table dataSource={LeadData} columns={columns} />

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}><NewLead/></Modal>
        </>
    )
}

export default Mainlead;