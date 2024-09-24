
import { Layout } from 'antd';
import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch(); 

  const handleLogout = () =>{
    dispatch(logout());
  }

  return (
    <Layout style={{height: '100vh'}} >
      <Layout>

        <Content 
        >
          <div
          className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'

          >
            <Outlet></Outlet>
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default MainLayout;