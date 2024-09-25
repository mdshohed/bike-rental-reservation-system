import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useGetAllRentalQuery } from '@/redux/features/rentalBike/rentalBikeApi';

interface DataType {
  key: string;
  name: string;
  startTime: string;
  returnTime: string;
  totalTime: string, 
  totalPaid: number; 
  totalCost: number;
}

const PaidTable: React.FC = () => {
  const { data: rental, isLoading } = useGetAllRentalQuery(null);

 const rentalData = rental?.data?.reduce((acc: DataType[], item: any) => {
  if (item.isReturned) {
    const startTime = new Date(item.startTime); // Convert startTime to a Date object
    const returnTime = item.returnTime ? new Date(item.returnTime) : new Date(); // Convert returnTime or use current Date

    const totalTime = Math.abs(returnTime.getTime() - startTime.getTime()); // Calculate the difference in milliseconds
    const totalTimeInHours = (totalTime / (1000 * 60 * 60)).toFixed(2); // Convert to hours and format

    acc.push({
      key: item?._id,
      name: item.bikeId.name,
      startTime: item.startTime,
      returnTime: item.returnTime ? item.returnTime : 'Pending',
      totalTime: totalTimeInHours, // Add totalTime in hours
      totalPaid: item.totalPaid,
      totalCost: parseFloat(item.totalCost.toFixed(3)),
    });
  }
  return acc;
}, []);

  
  console.log(rental?.data);

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
      title: 'Total Time',
      dataIndex: 'totalTime',
      key: 'totalTime',
    },
    {
      title: 'Total Paid',
      dataIndex: 'totalPaid',
      key: 'totalPaid',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    
  ];

  return (
    <Table<DataType> columns={columns} dataSource={rentalData} loading={isLoading}/>
  )
}



export default PaidTable;