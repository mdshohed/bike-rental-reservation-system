import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllRentalQuery } from "@/redux/features/rentalBike/rentalBikeApi";
import { useAppDispatch } from "@/redux/hooks";
import { addRentalMethod } from "@/redux/features/rentalBike/rentalSlice";

interface DataType {
  key: string;
  name: string;
  startTime: string;
  returnTime: string;
  totalPaid: number; 
  totalCost: number;
}


const UnpaidTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const { data: rental, isLoading } = useGetAllRentalQuery(null);

  const rentalData = rental?.data?.map((item: any) => {
    if(!item.isPaid){
      return{
        key: item?._id, 
        name: item.bikeId.name,
        startTime: item.startTime, 
        returnTime: item.returnTime? item.returnTime : 'Pending', 
        totalPaid: item.totalPaid,
        totalCost: parseFloat(item.totalCost).toFixed(3),
      }}
    else return null;
  });
  console.log(rentalData);

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     startTime: "2024-8-4:23:4",
  //     returnTime: "2024-8-4:23:4",
  //     totalCost: 100,
  //   },
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     startTime: "2024-8-4:23:4",
  //     returnTime: "2024-8-4:23:4",
  //     totalCost: 100,
  //   },
  // ];

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
      title: "Total Paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <a
              onClick={()=>handleUpdateRental(item.key)}
              className="text-white hover:text-gray-200 rounded-md bg-blue-500 px-6 py-2 "
            >
              Pay
            </a>
          </Space>
      )
    },
    },
  ];

  const handleUpdateRental = (bookingId: string) =>{
    dispatch(addRentalMethod({method: 'update', dueAmount: 20, bookingId: bookingId}))
    navigate("/user/checkout/")
  }

  return (
    <>
      {/* {isLoading && <GlobalLoader />} */}
      <Table<DataType> columns={columns} dataSource={rentalData} loading={isLoading} />
    </>
  );
};

export default UnpaidTable;
