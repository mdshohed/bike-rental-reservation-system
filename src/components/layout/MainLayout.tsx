
import { Button, Layout, Menu } from 'antd';
import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps['items'] = [
//   {
//     key: 'Dashboard',
//     label: <NavLink to='/admin/dashboard'>Dashboard</NavLink>
//   },
//   {
//     key: 'User Managerment',
//     label: 'User Managerment',
//     children: [
//       {
//         key: 'Create Admin',
//         label: <NavLink to='/admin/create-admin'>Create Admin</NavLink>
//       },
//       {
//         key: 'Create Faculty',
//         label: <NavLink to='/admin/create-faculty'>Create Faculty</NavLink>
//       },
//       {
//         key: 'Create Student',
//         label: <NavLink to='/admin/create-student'>Create Student</NavLink>
//       },
//     ]
//   },
// ]

const MainLayout = () => {
  const dispatch = useAppDispatch(); 

  const handleLogout = () =>{
    dispatch(logout());
  }

  return (
    <Layout style={{height: '100vh'}}>
      <Sidebar></Sidebar>
      <Layout>
        <Header style={{ padding: 0}}>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Shohedul Islam
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;