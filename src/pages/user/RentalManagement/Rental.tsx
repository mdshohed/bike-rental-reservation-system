// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import UnpaidTable from "./UnpaidTable";
// import PaidTable from "./PaidTable";

// const Rental = () => {
//   return (
//     <div className="mt-5">
//       <Tabs
//         defaultValue="unpaid"
//         className=""
//       >
//         <TabsList>
//           <TabsTrigger defaultChecked value="unpaid">
//             Unpaid
//           </TabsTrigger>
//           <TabsTrigger value="paid">Paid</TabsTrigger>
//         </TabsList>
//         <TabsContent value="unpaid">
//           <UnpaidTable></UnpaidTable>
//         </TabsContent>
//         <TabsContent value="paid">
//           <PaidTable></PaidTable>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Rental;

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