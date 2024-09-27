import UserList from "@/pages/admin/UserManagement/UserList";
import ReturnBike from "@/pages/admin/ReturnBike/ReturnBike";
import CouponManagement from "@/pages/admin/CouponManagement/CouponManagement";
import UserProfile from "@/components/UserProfile/UserProfile";
import ManageBike from "@/pages/admin/BikeManagement/ManageBike";
import AdminDashboard from "@/pages/admin/AdminDashboard";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
 
  // {
  //   index:true,
  //   element: <UserProfile />,
  // },
  {
    name: 'Return Bike',
    path: 'return-bike',
    element: <ReturnBike/>,
  },
  {
    name: 'Bike Manage',
    path: 'bike-management',
    element: <ManageBike/>,
  },
  {
    name: 'Coupon Management',
    path: 'coupon-management',
    element: <CouponManagement/>,
  },
  {
    name: 'User Management',
    path: 'manage-user',
    element: <UserList></UserList>,
  },
  {
    name: 'AdminProfile',
    path: 'profile',
    element: <UserProfile />,
  },
];
