// import { Button, Layout, theme } from 'antd';
// import {  Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import { useAppDispatch } from '../../redux/hooks';
// import { logout } from '../../redux/features/auth/authSlice';
// import { useState } from 'react';
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// const { Header, Content, Footer } = Layout;

// const MainLayout = () => {
//   const dispatch = useAppDispatch();

//   const handleLogout = () =>{
//     dispatch(logout());
//   }

//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout style={{height: '100vh'}} >
//       <Sidebar collapsed={collapsed}></Sidebar>
//       <Header style={{ padding: 0}}>
//           {/* <Button onClick={handleLogout}>Logout</Button> */}
//           <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//       </Header>
//       <Layout>
//       <Content style={{ margin: '24px 16px 0' }}>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//             }}
//           >
//             <Outlet></Outlet>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>
//           Ant Design ©{new Date().getFullYear()} Created by Shohedul Islam
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {  Breadcrumb, Button, Layout, Menu, theme } from "antd";

import Sidebar from "./Sidebar";
// import Menu as MenuHeadless from ''
import { Link, Outlet } from "react-router-dom";

import ThemeToggleButton from "@/pages/Shared/ThemeToggleButton";
import { BellIcon } from "lucide-react";
import AvatarNav from "../ui/AvatarNav";
import logo from '../../assets/logo/bike-zone-2.png'

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  //   key,
  //   label: `nav ${key}`,
  // }));
  // const items2: MenuProps["items"] = [
  //   UserOutlined,
  //   LaptopOutlined,
  //   NotificationOutlined,
  // ].map((icon, index) => {
  //   const key = String(index + 1);
  //   return {
  //     key: `sub${key}`,
  //     icon: React.createElement(icon),
  //     label: `subnav ${key}`,

  //     children: new Array(4).fill(null).map((_, j) => {
  //       const subKey = index * 4 + j + 1;
  //       return {
  //         key: subKey,
  //         label: `option${subKey}`,
  //       };
  //     }),
  //   };
  // });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="flex justify-between items-center">
      <div className="w-24 ">
        <img src={logo} alt="" />
      </div>
        <div>
          <Menu
          theme="dark"
          mode="horizontal"
          className="justify-end"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item style={{ backgroundColor: "transparent", display:"flex", justifyItems:'center', alignItems:'center' }}>
            <div>
              <Link to={"/"}>
                <Button> Back To Home</Button>
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item style={{ backgroundColor: "transparent", display:"flex", justifyItems:'center', alignItems:'center' }}>
            <div >
              <ThemeToggleButton></ThemeToggleButton>
            </div>
          </Menu.Item>
          <Menu.Item style={{ backgroundColor: "transparent", display:"flex", justifyItems:'center', alignItems:'center' }}>
            <div >
              <BellIcon aria-hidden="true"  />
             
            </div>
          </Menu.Item>
          <Menu.Item style={{ backgroundColor: "transparent" , display:"flex", justifyItems:'center', alignItems:'center'}}>
            <AvatarNav></AvatarNav>
          </Menu.Item>
        </Menu>
        </div>
        
      </Header>

      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}></Sidebar>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 54,
                height: 54,
              }}
            />
          </Header>

          <Content
            style={{
              padding: 24,
              margin: 10,
              minHeight: 280,

              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Breadcrumb
              items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
              // style={{ margin: "4px 0" }}
              className=""
            />
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
