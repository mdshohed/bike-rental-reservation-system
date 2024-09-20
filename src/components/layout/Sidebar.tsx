import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { adminPaths } from '../../routes/admin.routes';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULT: "faculty",
  STUDENT: "student"
}

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItmes; 

  switch(user!.role){
    case userRole.ADMIN: 
      sidebarItmes = sidebarItemsGenerator(adminPaths, userRole.ADMIN)
      break;
    case userRole.FACULT: 
      sidebarItmes = sidebarItemsGenerator(adminPaths, userRole.FACULT)
      break;
    case userRole.STUDENT: 
      sidebarItmes = sidebarItemsGenerator(adminPaths, userRole.STUDENT)
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
          <h1>PH-University</h1>
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          items={sidebarItmes} 
        />
      </Sider>
  );
};

export default Sidebar;