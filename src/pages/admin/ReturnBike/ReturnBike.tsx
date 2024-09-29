import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useGetAllRentalQuery } from "@/redux/features/rentalBike/rentalBikeApi";
import { useReturnBikeMutation } from "@/redux/features/returnBike/returnBikeApi";
import { toast } from "sonner";
import SearchField from "@/components/ui/search/SearchField";

interface DataType {
  key: string;
  name: string;
  userName: string;
  userEmail: string;
  startTime: string;
  returnTime: string;
  totalPaid: number;
  totalCost: number;
  discount: number
  isReturned: boolean;
}

const ReturnBike: React.FC = () => {
  const { data: rental, isLoading } = useGetAllRentalQuery(null);

  const rentalData = rental?.data?.reduce((acc: DataType[], item: any) => {
    // if (!item.isReturned) {
    acc.push({
      key: item?._id,
      name: item.bikeId.name,
      userName: item.userId.name,
      userEmail: item.userId.email,
      startTime: item.startTime,
      returnTime: item.returnTime ? item.returnTime : "N/A",
      totalPaid: item.totalPaid ? item.totalPaid : 0,
      discount: (item.discount ? item.discount : 0 ), 
      totalCost: parseFloat(item.totalCost.toFixed(3)),
      isReturned: item.isReturned,
    });
    // }
    return acc;
  }, []);
  console.log("data", rentalData);
  const [returnBike] = useReturnBikeMutation();

  const handleUpdateRental = async (bookingId: string) => {
    const toastId = toast.loading("Updated Loading...");
    try {
      const res = await returnBike({ id: bookingId }).unwrap();
      if (res?.statusCode == 200 && res?.success) {
        toast.success("Bike returned successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Bike returned Error!", { id: toastId });
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Bike Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
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
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (item) => ( <div>{item}%</div> )
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        if (!item.isReturned) {
          return (
            <Space size="middle">
              <p
                onClick={() => handleUpdateRental(item.key)}
                className="text-white cursor-pointer hover:text-gray-200 rounded-md bg-red-500 px-6 py-2 "
              >
                Calculate
              </p>
            </Space>
          );
        }
        else{
          return (
            <Space size="middle">
              <p
                className="text-white rounded-md bg-gray-500 px-6 py-2 "
              >
                Returned
              </p>
            </Space>
          );
        }
      },
    },
  ];
  return (
    <div className="mt-3">
      <div>
        <h1 className="text-2xl text-black font-semibold">Rental Details</h1>
        <h1 className="text-[16px] my-2">Manage Rental Details and Updated Bike Return</h1>
        <div className="my-4">
            <div>
              <SearchField></SearchField>
            </div>
          </div>
      </div>
      <div className="mt-10 overflow-x-auto">
        <Table<DataType>
          columns={columns}
          dataSource={rentalData}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default ReturnBike;
