import UserList from "@/pages/admin/UserManagement/UserList";
import ReturnBike from "@/pages/admin/ReturnBike/ReturnBike";
import CouponManagement from "@/pages/admin/CouponManagement/CouponManagement";
import UserProfile from "@/components/UserProfile/UserProfile";
import ManageBike from "@/pages/admin/BikeManagement/ManageBike";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { DashboardOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Bike, Gauge, Puzzle, ShoppingBasket, Undo2, UserCog, UserPen } from "lucide-react";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Gauge className="w-5 h-5"/>,
    element: <AdminDashboard />,
  },
  {
    name: 'Return Bike',
    path: 'return-bike',
    icon: <Undo2 className="w-5 h-5"/>,
    element: <ReturnBike/>,
  },

  {
    name: 'Bike Manage',
    path: 'bike-management',
    icon: <Bike className="w-5 h-5"/>,
    element: <ManageBike/>,
  },
  {
    name: 'Coupon Management',
    path: 'coupon-management',
    icon: <Puzzle className="w-5 h-5"/>,
    element: <CouponManagement/>,
  },
  {
    name: 'User Management',
    path: 'manage-user',
    icon: <UserCog className="w-5 h-5"/>,
    element: <UserList></UserList>,
  },
  {
    name: 'AdminProfile',
    path: 'profile',
    icon: <UserPen className="w-5 h-5"/>,
    element: <UserProfile />,
  },
];
