import UserProfile from "@/components/UserProfile/UserProfile";
import Rental from "@/pages/user/RentalManagement/Rental";
import UserDashboard from "@/pages/user/UserDashboard";

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Rental-Management',
    path: 'rental-management',
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
    element: <UserProfile />,
  },
  
];