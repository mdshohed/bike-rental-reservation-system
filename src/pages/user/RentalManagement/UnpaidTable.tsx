import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  startTime: string;
  returnTime: string;
  totalCost: number;
}

const UnpaidTable: React.FC = () => {
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      startTime: "2024-8-4:23:4",
      returnTime: "2024-8-4:23:4",
      totalCost: 100,
    },
    {
      key: "1",
      name: "John Brown",
      startTime: "2024-8-4:23:4",
      returnTime: "2024-8-4:23:4",
      totalCost: 100,
    },
  ];

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
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a
            onClick={() => navigate("/user/checkout/")}
            className="text-white hover:text-gray-200 rounded-md bg-blue-500 px-6 py-2 "
          >
            Pay
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  );
};

export default UnpaidTable;
