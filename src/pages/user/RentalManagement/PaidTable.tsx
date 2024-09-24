import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  startTime: string;
  returnTime: string;
  totalCost: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Bike Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: 'Return Time',
    dataIndex: 'returnTime',
    key: 'returnTime',
  },
  {
    title: 'Total Cost',
    dataIndex: 'totalCost',
    key: 'totalCost',
  },
  
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    startTime: '2024-8-4:23:4',
    returnTime: '2024-8-4:23:4',
    totalCost: 100,
  },
];

const PaidTable: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default PaidTable;