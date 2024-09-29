import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Upload,
} from "antd";
import Swal from "sweetalert2";
import type { TableProps } from "antd";
import { TBike } from "@/types/bikes";
import {
  useAddBikeMutation,
  useDeleteBikeMutation,
  useGetAllBikesQuery,
  useUpdateBikeMutation,
} from "@/redux/features/bikes/bikesApi";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import TextArea from "antd/es/input/TextArea";
import SearchField from "@/components/ui/search/SearchField";
type OnChange = NonNullable<TableProps<TBike>["onChange"]>;
// type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
// type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ManageBike: React.FC = () => {
  const { data: bikes, isLoading } = useGetAllBikesQuery(null);
  const [addBike] = useAddBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();
  const [updateBike] = useUpdateBikeMutation();
  const [form] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentBike, setCurrentBike] = useState<TBike>({} as TBike);
  // const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  // const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  // const [fileList, setFileList] = useState<any[]>([]);

  // const handleUploadChange = ({ fileList: newFileList }: any) => {
  //   setFileList(newFileList);
  // };

  // const handleChange: OnChange = (pagination, filters, sorter) => {
  //   console.log("Various parameters", pagination, filters, sorter);
  //   setFilteredInfo(filters);
  //   setSortedInfo(sorter as Sorts);
  // };

  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };

  // const clearAll = () => {
  //   setFilteredInfo({});
  //   setSortedInfo({});
  // };

  // const setAgeSort = () => {
  //   setSortedInfo({
  //     order: "descend",
  //     columnKey: "age",
  //   });
  // };

  const handleDeleteBike = async (id: string) => {
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
        await deleteBike(id);
        toast.success("Deleted Bike Successfully!", {
          id: toastId,
          duration: 2000,
        });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  // const handleStatusChange = async (data: TBike) => {
  //   const toastId = toast.loading("Updated Loading...");
  //   const payload = {
  //     isAvailable: data.isAvailable ? false : true,
  //   };
  //   const id = data?._id ? data?._id : "";
  //   try {
  //     await updateBike({ id: id, updatedBike: payload });
  //     toast.success("Status Change Successfully!", {
  //       id: toastId,
  //       duration: 2000,
  //     });
  //   } catch (err) {
  //     toast.error("Something went wrong", { id: toastId });
  //   }
  // };

  const handleAddBike = async () => {
    try {
      const values = await form.validateFields(); // Validates the form fields
      console.log("Form values:", values);

      const toastId = toast.loading("Loading...");
      const payload = {
        name: values.name,
        brand: values.brand,
        model: values.model,
        cc: parseFloat(values.cc),
        pricePerHour: parseFloat(values.pricePerHour),
        year: parseFloat(values.year),
        description: values.description,
      };
      const img = values.upload;
      console.log("Image file:", img);

      const res = await addBike(payload).unwrap();
      console.log("API Response:", res);
      if (res?.statusCode === 200 && res?.success) {
        toast.success("Bike Added Successfully!", {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.error("Bike Added Error!", { duration: 1000 });
      }
      form.resetFields();
      // Modal.destroyAll();
    } catch (errorInfo) {
      console.log("Form validation or API call failed:", errorInfo);
      toast.error("Something went wrong!", { duration: 1000 });
    }
  };

  const handleUpdateBike = (record: TBike) => {
    setCurrentBike(record);
    updateFrom.setFieldsValue(record);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async () => {
    const toastId = toast.loading("Updated Loading...");

    try {
      const values = await updateFrom.validateFields();
      const payload = {
        name: values.name,
        brand: values.brand,
        model: values.model,
        cc: parseFloat(values.cc),
        pricePerHour: parseFloat(values.pricePerHour),
        year: parseFloat(values.year),
        description: values.description,
      };

      const res = await updateBike({
        id: currentBike?._id,
        updatedBike: payload,
      }).unwrap();
      console.log("API Response:", res);
      if (res?.statusCode === 200 && res?.success) {
        toast.success("Bike Updated Successfully!", {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.error("Bike Updated Error!", { duration: 1000 });
      }
      setIsUpdateModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const columns: TableProps<TBike>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, render) => (
        <div>
          <p className="text-md font-bold">{render.name}</p>
          <p>
            {render.description.length > 15
              ? `${render.description.substring(0, 15)}...`
              : render.description}
          </p>{" "}
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Engine Capacity",
      dataIndex: "cc",
      key: "cc",
      render: (text) => <a>{text}cc</a>,
    },
    {
      title: "Price PerHours",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
    },
    {
      title: "IsAvailable",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (_, record) => (
        <div 
        // onClick={() => handleStatusChange(record)}
        >
          <p className={`text-white w-10 text-center  rounded-md ${record.isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}>{ record.isAvailable ? "Yes" : "No"}</p>
        </div>
      ),
    },

    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleUpdateBike(record)}
            className="text-blue-500 text-lg"
          />
          <DeleteOutlined
            onClick={() => handleDeleteBike(record?._id ? record?._id : "")}
            className="text-red-500 hover:text-red-600 text-lg"
          />
        </Space>
      ),
    },
  ];
  return (
    <div className="mt-5 overflow-x-auto">
      <div>
        <h1 className="text-2xl text-black font-semibold">Bike Management</h1>
        <h1 className="text-[16px] my-2">Manage Bike Status</h1>
      </div>

      {/* add Bike part */}
      <div style={{ marginBottom: 16 }}>
        <div className="flex justify-between items-center">
          <div>
            {/* <Button onClick={setAgeSort}>Sort age</Button> */}
            {/* <Button onClick={clearAll}>Clear filters</Button> */}
            <div>
              <SearchField></SearchField>
            </div>
          </div>
          <div className="me-4 sm:me-10">
            <Button
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "Add Product",
                  icon: null,
                  width: 550,
                  content: (
                    <Form form={form} layout="vertical">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Bike Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Bike Name",
                              },
                            ]}
                          >
                            <Input placeholder="Enter bike name" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="brand"
                            label="Brand name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Brand Name",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Brand Name" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="model"
                            label="Model Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the model",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Model" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="cc"
                            label="Engine Capacity(CC)"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Engine Capacity",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              min={0}
                              placeholder="Enter Engine Capacity"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="pricePerHour"
                            label="Price Per Hour"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Price Per Hour",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              min={0}
                              placeholder="Enter Price Per Hour"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="year"
                            label="year"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Year",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              min={0}
                              placeholder="Enter Year"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        name="description"
                        label="description"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the description",
                          },
                        ]}
                      >
                        <TextArea
                          autoSize={{ minRows: 2, maxRows: 3 }}
                          placeholder="Enter description"
                        />
                      </Form.Item>

                      <Form.Item
                        name="upload"
                        label="Upload Product Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e?.fileList}
                      >
                        <Upload
                          listType="picture"
                          maxCount={1}
                          beforeUpload={() => false} // Prevent automatic upload, handle manually on submit
                          // onChange={handleUploadChange}
                        >
                          <Button icon={<UploadOutlined />}>
                            Select Image
                          </Button>
                        </Upload>
                      </Form.Item>
                      {/* </Row> */}
                    </Form>
                  ),
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <Button type="primary" onClick={handleAddBike}>
                        Add Product
                      </Button>
                    </>
                  ),
                });
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* table part  */}
      <Table<TBike>
        columns={columns}
        dataSource={bikes?.data}
        loading={isLoading}
      />

      {/* updated modal */}

      <Modal
        title="Update Bike"
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
        {/* <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Bike Name"
            rules={[{ required: true, message: "Please enter the Bike Name" }]}
          >
            <Input placeholder="Enter bike name" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the Brand Name" }]}
          >
            <Input placeholder="Enter Brand Name" />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model Name"
            rules={[{ required: true, message: "Please enter the model" }]}
          >
            <Input placeholder="Enter Model" />
          </Form.Item>
          <Form.Item
            name="cc"
            label="Engine Capacity (CC)"
            rules={[{ required: true, message: "Please enter the Engine Capacity" }]}
          >
            <Input placeholder="Enter Engine Capacity" />
          </Form.Item>
          <Form.Item
            name="pricePerHour"
            label="Price Per Hour"
            rules={[{ required: true, message: "Please enter the Price Per Hour" }]}
          >
            <Input placeholder="Enter Price Per Hour" />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please enter the Year" }]}
          >
            <Input placeholder="Enter Year" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
        </Form> */}
        <Form form={updateFrom} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Bike Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Bike Name",
                  },
                ]}
              >
                <Input placeholder="Enter bike name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Brand Name",
                  },
                ]}
              >
                <Input placeholder="Enter Brand Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the model",
                  },
                ]}
              >
                <Input placeholder="Enter Model" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cc"
                label="Engine Capacity(CC)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Engine Capacity",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Engine Capacity"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pricePerHour"
                label="Price Per Hour"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Price Per Hour",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Price Per Hour"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="year"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Year",
                  },
                ]}
              >
                <Input type="number" min={0} placeholder="Enter Year" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 3 }}
              placeholder="Enter description"
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              // onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          {/* </Row> */}
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBike;
