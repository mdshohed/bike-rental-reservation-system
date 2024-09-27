import React, { useState } from "react";
import {
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const AvatarNav: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async() => {
    setIsLoggingOut(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    setIsLoggingOut(false);
    dispatch(logout()); 
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <p className="text-[16px] cursor-text">{user?.userEmail}</p>
        </div>
      ),
      // disabled: true,
    },
    {
      key: "4",
      label: (
        <div onClick={handleLogout}>
          {isLoggingOut ? (
            <LoadingOutlined style={{ marginRight: 8 }} />
          ) : (
            <LogoutOutlined style={{ marginRight: 8 }} />
          )}
          {isLoggingOut ? "Logging Out..." : "Log Out"}
        </div>
      ),
    },
  ];
  return (
    <Dropdown 
    // arrow
      overlayStyle={{ minWidth: "200px", top: "50px" }}
      menu={{ items }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {isLoggingOut ? (
            <Avatar  icon={<LoadingOutlined classID="opacity-100"/>} />
          ) : (
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          )}

          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default AvatarNav;
