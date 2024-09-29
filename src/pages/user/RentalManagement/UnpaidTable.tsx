import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
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
  due: number;
}

const UnpaidTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: rental, isLoading } = useGetAllRentalQuery(null);
  const [rentalData, setRentalData] = useState<DataType[]>([]);

  // useEffect(() => {
  //   if (rental && rental.data) {
  //     const transformData = rental?.data?.map((item: any) => {
  //       if (!item.isPaid) {
  //         const startTime = new Date(item.startTime);
  //         const returnTime = new Date(item.returnTime);
  //         const durationMs = returnTime.getTime() - startTime.getTime();
  //         const duration = (durationMs / (1000 * 60 * 60)).toFixed(2);

  //         const totalCost = parseFloat(item.totalCost) || 0;
  //         const totalPaid = parseFloat(item.totalPaid) || 0;

  //         const remainingAmount = (totalCost - totalPaid).toFixed(2);
  //         return {
  //           key: item?._id,
  //           name: item.bikeId.name,
  //           startTime: item.startTime,
  //           returnTime: item.returnTime,
  //           duration: duration,
  //           totalPaid: item.totalPaid,
  //           discount: item.percentage ? item.percentage : 0,
  //           totalCost: parseFloat(item.totalCost).toFixed(3),
  //           due: remainingAmount,
  //         };
  //       } else return null;
  //     });
  //     console.log(rentalData);
  //     setRentalData(transformData);
  //   }
  // }, [rental]);

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
  useEffect(() => {
    if (rental && rental.data) {
      const transformData = rental.data
        .map((item: any) => {
          if (!item.isPaid) {
            const startTime = new Date(item.startTime);
            const returnTime = new Date(item.returnTime);
            const durationMs = returnTime.getTime() - startTime.getTime();
            const duration = (durationMs / (1000 * 60 * 60)).toFixed(2);
  
            const totalCost = parseFloat(item.totalCost) || 0;
            const totalPaid = parseFloat(item.totalPaid) || 0;
            const remainingAmount = (totalCost - totalPaid).toFixed(2);
  
            return {
              key: item?._id,
              name: item.bikeId.name,
              startTime: item.startTime,
              returnTime: item.returnTime,
              duration: duration,
              totalPaid: item.totalPaid,
              discount: item.discount ? item.discount : 0,
              totalCost: parseFloat(item.totalCost).toFixed(3),
              due: remainingAmount,
            };
          } else return null;
        })
        .filter((item: any) => item !== null);
  
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
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
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
      title: "Total Due",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Coupon Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <p>{text}%</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <a
              onClick={() => handleUpdateRental(item)}
              className="text-white hover:text-gray-200 rounded-md bg-blue-500 px-6 py-2 "
            >
              Pay
            </a>
          </Space>
        );
      },
    },
  ];

  const handleUpdateRental = (bookingData: DataType) => {
    dispatch(
      addRentalMethod({
        method: "update",
        dueAmount: bookingData.due,
        bookingId: bookingData.key,
      })
    );
    navigate("/duePay/checkout");
  };

  return (
    <>
      {/* {isLoading && <GlobalLoader />} */}
      <Table<DataType>
          columns={columns}
          dataSource={rentalData.length ? rentalData : []}
          loading={isLoading}
          // locale={{ emptyText: 'No unpaid rentals available' }} // Add a custom message when the table is empty
        />

    </>
  );
};

export default UnpaidTable;
