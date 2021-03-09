
import {Tree} from 'antd';
export const Treeview = ()=>{
    // sample data
    const treeData = [
        {
          title: 'CEO',
          key: '0-0',
          children: [
            {
              title: 'Manager',
              key: '0-0-0',
            },
            {
              title: 'Admin',
              key: '0-0-1',
              children: [
                {
                  title: 'Executive',
                  key:'0-0-0-0'
                }
              ]
            },
          ],
        },
      ];

    return (
        <Tree
   
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    treeData={treeData}
  />
    )
}

export default Treeview;
