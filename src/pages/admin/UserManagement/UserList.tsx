import React from "react";
import {  Space, Switch, Table } from "antd";
import type { TableProps } from "antd";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/utils";
import { toast } from "sonner";
import { timeDiff } from "@/utils/common";
import create from "@ant-design/icons/lib/components/IconFont";

const UserList: React.FC = () => {
  const { data: user, isLoading } = useGetAllUserQuery(null);
  const [updateUser] = useUpdateUserMutation(); 

  const handleUpdateUser = async (data: TUser) => {
    const toastId = toast.loading("Updated Loading...")
    const payload = {
      role: data.role === 'admin' ? 'user' : 'admin'
    }
    const id = data?._id;
    try{
      console.log(payload, id);
      
      const res = await updateUser({id:id, data:payload})
      console.log({res});
      
      toast.success("Updated Successfully!", { id: toastId, duration: 2000 });

    }catch(err){
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleChangeActive = async (data: TUser) =>{
    console.log(data);
    
    const toastId = toast.loading("Updated Loading...")
    const payload = {
      isActive: data.isActive===true ? false : true
    }
    const id = data?._id;
    try{
      console.log(payload, id);
      
      await updateUser({id:id, data: payload})
      toast.success("Updated Successfully!", { id: toastId, duration: 2000 });

    }catch(err){
      toast.error("Something went wrong", { id: toastId });
    }

  }

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Current Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Space size="middle">
          <div className={`${role=='admin'? 'bg-red-500':'bg-green-500'} text-white px-3 pb-0.5 rounded-xl `}>{role}</div>
        </Space>
      )
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const memberSinceDate = new Date(createdAt);
        const currentDate = new Date();
        const diffTime = Math.abs(
          currentDate.getTime() - memberSinceDate.getTime()
        );
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return timeDiff(createdAt);
      },
    },
    {
      title: "Status",
      dataIndex: "action",
      key: "action",
      render: (_,record) => {        
        return (
          <Space size="middle">
            <Switch defaultChecked={record?.isActive} onChange={()=>handleChangeActive(record)} />
          </Space>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_,record) => {
        
        return (
          <Space size="middle">
            <button
              className={`text-white flex justify-center items-center hover:text-gray-200 rounded-md ${record.role==='admin'?'bg-red-500 ' :'bg-green-500'} px-2 py-1`}
              onClick={() => handleUpdateUser(record)}
            >
             { record.role==='admin'?  "Demote To User": "Promote to Admin"  }
            </button>
          </Space>
        );
      },
    },
    
  ];

  return (
    <div className="mt-10 overflow-x-auto">
      <div>
        <h1 className="text-3xl text-black font-semibold">User Management</h1>
        <h1 className="text-md my-4">Manage User Role and Permissions</h1>
      </div>
      <Table<TUser>
        columns={columns}
        dataSource={user?.data}
        loading={isLoading}
      />
    </div>
  );
};

export default UserList;
