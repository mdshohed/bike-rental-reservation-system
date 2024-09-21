import { userPaths } from '@/routes/user.routes';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { adminPaths } from '../../routes/admin.routes';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user"
}

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems; 

  switch(user!.role){
    case userRole.ADMIN: 
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN)
      break;
    case userRole.USER: 
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER)
      break;
    default: 
      break;
  }

  return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div
          style={{
            color: 'white',
            height: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1>Bike-Share</h1>
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          items={sidebarItems} 
        />
      </Sider>
  );
};

export default Sidebar;