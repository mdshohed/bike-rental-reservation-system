

import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UnpaidTable from './UnpaidTable';
import PaidTable from './PaidTable';

const onChange = (key: string) => {
  console.log(key);
};


const Rental: React.FC = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Unpaid',
      children: <UnpaidTable></UnpaidTable>,
    },
    {
      key: '2',
      label: 'Paid',
      children: <PaidTable></PaidTable>
    },
  ];
  
  return (
    <>
    
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
}

export default Rental;