import AdminProfile from "@/pages/admin/AdminProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserList from "@/pages/admin/UserManagement/UserList";
import ReturnBike from "@/pages/admin/ReturnBike/ReturnBike";
import CouponManagement from "@/pages/admin/CouponManagement/CouponManagement";
import UserProfile from "@/components/UserProfile/UserProfile";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'profile',
    element: <UserProfile />,
  },
  {
    // name: 'Dashboard',
    index:true,
    element: <AdminDashboard />,
  },
  {
    name: 'Return Bike',
    path: 'return-bike',
    element: <ReturnBike/>,
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
];
