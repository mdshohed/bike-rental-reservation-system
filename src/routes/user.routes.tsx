import UserProfile from "@/components/UserProfile/UserProfile";
import Rental from "@/pages/user/RentalManagement/Rental";
import UserDashboard from "@/pages/user/UserDashboard";
import { Gauge, Package, UserPen } from "lucide-react";

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Gauge  className="w-5 h-5"/>,
    element: <UserDashboard />,
  },
  {
    name: 'Rental-Management',
    path: 'rental-management',
    icon: <Package className="w-5 h-5"/>,
    element: <Rental />,
  },
  // {
  //   name: 'Rental-Management',
  //   path: 'booking-bike',
  //   element: <BookingProcess />,
  // },
  {
    name: 'User Profile',
    path: 'profile',
    icon: <UserPen className="w-5 h-5"/>,
    element: <UserProfile />,
  },
  
];