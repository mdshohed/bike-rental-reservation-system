
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link, NavLink } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import AvatarNav from "../ui/AvatarNav";

import ThemeToggleButton from "@/pages/Shared/ThemeToggleButton";


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
