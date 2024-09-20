import UserDashboard from "../pages/user/UserDashboard";
import UserProfile from "../pages/user/UserProfile";

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Settings',
    children: [
      {
        name: 'Profile',
        path: 'profile',
        element: <UserProfile/>,
      },
    ],
  },
];