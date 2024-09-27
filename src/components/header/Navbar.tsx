// import { Link } from "react-router-dom";
// import logo from "../../assets/logo/bike-share-removebg-preview.png";
// import ThemeToggleButton from "./ThemeToggleButton";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
// import { Button } from "antd";
// const Navbar = () => {
//   const token = useAppSelector(useCurrentToken);
//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };
//   return (
//     <div>
//       <nav className="lg:fixed transition-all top-0 left-0 z-50 duration-500 w-full dark:bg-gray-800 light:bg-white text-surface/75 dark:text-gray-400">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="w-full flex flex-col lg:flex-row">
//             <div className="flex justify-between lg:flex-row">
//               <Link to="/" className="flex items-center">
//                 <img src={logo} className="h-16" alt="" />
//               </Link>
//               <div className="lg:hidden me-2 flex ms-auto items-center">
//                 <ThemeToggleButton></ThemeToggleButton>
//               </div>

//               <div className="flex justify-center items-center lg:hidden">
//                 <div className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white p-2 hover:bg-slate-200">
//                   <div className="space-y-2 flex justify-center items-center flex-col">
//                     <span className="block h-1 w-8 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
//                     <span className="block h-1 w-6 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-8 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="hidden w-full lg:flex lg:pl-11 max-lg:mt-1 max-lg:h-screen max-lg:overflow-y-auto"
//               id="navbar"
//             >
//               <ul className="flex lg:items-center lg:justify-center flex-col max-lg:gap-4 max-lg:pt-4 max-lg:mb-4 lg:mt-0 lg:flex-row lg:mx-auto ">
//                 <li>
//                   <Link
//                     to="/home"
//                     className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base font-medium transition-all duration-300 dark:hover:text-gray-300 hover:text-gray-500"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/about-us"
//                     className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left  font-medium transition-all duration-300 dark:hover:text-gray-300 hover:text-gray-500"
//                   >
//                     About us
//                   </Link>
//                 </li>
//               </ul>
//               <div className="flex lg:items-center w-full justify-start flex-col lg:flex-row gap-4 lg:w-max max-lg:gap-4 lg:ml-14 lg:justify-end">
//                 <ThemeToggleButton></ThemeToggleButton>

//                 {token ? (
//                   <Button onClick={handleLogout}>Logout</Button>
//                 ) : (
//                   <div>
//                     <Link to="/login">
//                       <button className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
//                         Login
//                       </button>
//                     </Link>

//                     <Link to="/register">
//                       <button className="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-700">
//                         SignUP
//                       </button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link, NavLink } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import AvatarNav from "../ui/AvatarNav";
import { BellIcon } from "lucide-react";
import ThemeToggleButton from "@/pages/Shared/ThemeToggleButton";
import { Avatar, Badge } from "antd";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);

  const navItems = [
    {
      id: 1,
      title: "Home",
      protected: false,
      path: "/",
    },
    {
      id: 3,
      title: "Bikes",
      path: "/bikes",
      protected: false,
    },
    {
      id: 2,
      title: "About Us",
      path: "/about-us",
      protected: false,
    },
  ];

  return (
    <nav className="bg-slate-900 ">
      <div className="max-w-7xl mx-auto px-[5%] text-white font-semibold flex justify-between items-center">
        <div className="hidden md:block">
          {navItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                `h-full border-b-2 text-center inline-block transition-colors py-5 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-slate-900 hover:border-primary hover:text-primary"
                } ${item.protected ? "hidden" : "block"}`
              }
            >
              <span
                className={`px-5 ${
                  index !== navItems.length - 1
                    ? "border-r border-slate-400"
                    : ""
                }`}
              >
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>
        <MobileNavbar />
        {/* <BtnAccount /> */}

        <div className="flex flex-row justify-end items-center my-5">
          {token ? (
            <div className="me-4">
              <Link to={`${user?.role}/dashboard`}>
                <p className="block px-4 py-2 text-sm text-gray-200 bg-blue-500 rounded-lg  data-[focus]:bg-gray-100">
                  Dashboard
                </p>
              </Link>
            </div>
          ) : null}

          <div className="me-3">
            <ThemeToggleButton></ThemeToggleButton>
          </div>
          {!token ? (
            <div>
              <Link to="/login">
                <button className="me-2 bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-4 text-sm hover:bg-indigo-100">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-4 text-sm hover:bg-indigo-700">
                  SignUp
                </button>
              </Link>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
              {/* <Badge count={"5"}>
                <BellIcon className="h-6 w-6" />
              </Badge> */}
              <AvatarNav></AvatarNav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
