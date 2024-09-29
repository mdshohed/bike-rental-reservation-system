import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
} from "antd";
import type { TableProps } from "antd";
import { toast } from "sonner";
import SearchField from "@/components/ui/search/SearchField";
import { TCoupon } from "@/types/coupon";
import {
  useAddCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useUpdateCouponMutation,
} from "@/redux/features/coupon/couponApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const CouponManagement: React.FC = () => {
  const { data: coupons, isLoading } = useGetAllCouponQuery(null);
  const [addCoupon] = useAddCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [isAddModalVisible, setIAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateFrom] = Form.useForm();
  const [form] = Form.useForm();
  const [currentCoupon, setCurrentCoupon] = useState<TCoupon>({} as TCoupon);

  const handleAddCoupon = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const values = await form.validateFields();
      const payload = {
        couponCode: values.couponCode.trim(),
        percentage: parseInt(values.percentage),
      };
      const res = await addCoupon(payload).unwrap();
      if (res?.statusCode === 200 && res?.success) {
        toast.success("Coupon Added Successfully!", {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.error(res.message, { id: toastId, duration: 1000 });
      }
      setIAddModalVisible(false);
      form.resetFields();
    } catch (errorInfo) {
      toast.error("Something went wrong!", { id: toastId, duration: 1000 });
    }
  };

  const handleUpdateCoupon = (record: TCoupon) => {
    setCurrentCoupon(record);
    updateFrom.setFieldsValue(record);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async () => {
    const toastId = toast.loading("Updated Loading...");

    try {
      const values = await updateFrom.validateFields();
      const payload = {
        couponCode: values.couponCode.trim(),
        percentage: parseInt(values.percentage),
      };

      const res = await updateCoupon({
        id: currentCoupon?._id,
        data: payload,
      }).unwrap();
      console.log("API Response:", res);
      if (res?.statusCode === 200 && res?.success) {
        toast.success("Coupon Updated Successfully!", {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.error("Coupon Updated Error!", { duration: 1000 });
      }
      setIsUpdateModalVisible(false);
      updateFrom.resetFields();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const toastId = toast.loading("Updated Loading...");
      try {
        await deleteCoupon(id);
        toast.success("Deleted Coupon Successfully!", {
          id: toastId,
          duration: 2000,
        });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const handleChangeActive = async (data: TCoupon) => {
    console.log(coupons);

    const toastId = toast.loading("Updated Loading...");
    const payload = {
      isAvailable: data.isAvailable === true ? false : true,
    };
    const id = data?._id;
    try {
      console.log(payload, id);

      await updateCoupon({ id: id, data: payload });
      toast.success("Updated Successfully!", { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const columns: TableProps<TCoupon>["columns"] = [
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (text) => <a>{text}%</a>,

    },

    {
      title: "Status",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Switch
              defaultChecked={record?.isAvailable}
              onChange={() => handleChangeActive(record)}
            />
          </Space>
        );
      },
    },
    {
      title: "Action",
      
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleUpdateCoupon(record)}
            className="text-blue-500 text-lg"
          />
          <DeleteOutlined
            onClick={() => handleDeleteCoupon(record?._id ? record?._id : "")}
            className="text-red-500 hover:text-red-600 text-lg"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <div>
        <h1 className="text-2xl text-black font-semibold">Coupon Manage</h1>
        <h1 className="text-[16px] my-2">Create coupon for user discount</h1>
        <div style={{ marginBottom: 16 }}>
          <div className="flex justify-between items-center">
            <div>
              <div>
                <SearchField></SearchField>
              </div>
            </div>
            <div className="me-4 sm:me-10">
              <Button type="primary" onClick={() => setIAddModalVisible(true)}>
                Add CouponCode
              </Button>
             
            </div>
             <Modal
                title="Create Coupon"
                visible={isAddModalVisible}
                onCancel={() => setIAddModalVisible(false)}
                footer={[
                  <Button
                    key="cancel"
                    onClick={() => setIAddModalVisible(false)}
                  >
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleAddCoupon}>
                    Add CouponCode
                  </Button>,
                ]}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="couponCode"
                    label="Coupon Code"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Coupon Code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Coupon Code" />
                  </Form.Item>

                  <Form.Item
                    name="percentage"
                    label="Percentage"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Coupon Percentage",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Percentage" />
                  </Form.Item>
                </Form>
              </Modal>
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-x-auto">
        <Table<TCoupon>
          columns={columns}
          dataSource={coupons?.data}
          loading={isLoading}
        />

        <Modal
          title="Update Coupon"
          visible={isUpdateModalVisible}
          onCancel={() => setIsUpdateModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsUpdateModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateSubmit}>
              Update
            </Button>,
          ]}
        >
          <Form form={updateFrom} layout="vertical">
            <Form.Item
              name="couponCode"
              label="Coupon Code"
              rules={[
                {
                  required: true,
                  message: "Please enter the Coupon Code",
                },
              ]}
            >
              <Input placeholder="Enter Coupon Code" />
            </Form.Item>

            <Form.Item
              name="percentage"
              label="Percentage"
              rules={[
                {
                  required: true,
                  message: "Please enter the Coupon Percentage",
                },
              ]}
            >
              <Input placeholder="Enter Percentage" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default CouponManagement;
