import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useGetAllRentalQuery } from "@/redux/features/rentalBike/rentalBikeApi";

interface DataType {
  key: string;
  name: string;
  startTime: string;
  returnTime: string;
  totalTime: string;
  totalPaid: number;
  totalCost: number;
}

const PaidTable: React.FC = () => {
  const { data: rental, isLoading } = useGetAllRentalQuery(null);
  const [rentalData, setRentalData] = useState<DataType[]>([]);

  useEffect(() => {
    if (rental && rental.data) {
      const transformData = rental.data.reduce((acc: DataType[], item: any) => {
        if (item.isPaid) {
          const startTime = new Date(item.startTime);
          const returnTime = item.returnTime ? new Date(item.returnTime) : null;

          const totalTime = returnTime
            ? Math.abs(returnTime.getTime() - startTime.getTime())
            : 0;
          const totalTimeInHours = (totalTime / (1000 * 60 * 60)).toFixed(2);

          acc.push({
            key: item?._id,
            name: item.bikeId.name,
            startTime: item.startTime,
            returnTime: returnTime ? item.returnTime : "Pending",
            totalTime: totalTimeInHours, // Total time in hours
            totalPaid: item.totalPaid,
            totalCost: parseFloat(item.totalCost.toFixed(3)), // Ensure totalCost is a valid number
          });
        }
        return acc;
      }, []);

      setRentalData(transformData);
    }
  }, [rental]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Bike Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
    },
    {
      title: "Total Time",
      dataIndex: "totalTime",
      key: "totalTime",
    },
    {
      title: "Total Paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={rentalData}
      loading={isLoading}
    />
  );
};

export default PaidTable;
