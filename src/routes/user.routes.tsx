import UserProfile from "@/components/UserProfile/UserProfile";
import Rental from "@/pages/user/RentalManagement/Rental";
import BookingProcess from "@/pages/user/BookingProcess/BookingProcess";
import Payment from "@/components/Payment/Payment";

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'profile',
    element: <UserProfile />,
  },
  {
    name: 'Rental-Management',
    path: 'rental-management',
    element: <Rental />,
  },
  {
    name: 'Rental-Management',
    path: 'booking-bike',
    element: <BookingProcess />,
  },
  {
    name: 'CheckOut',
    path: 'checkout',
    element: <Payment />,
  },
  
];