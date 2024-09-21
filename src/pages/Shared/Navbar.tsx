import { Link } from "react-router-dom";
import logo from "../../assets/logo/bike-share-removebg-preview.png";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { Button } from "antd";
const Navbar = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="lg:fixed transition-all top-0 left-0 z-50 duration-500 w-full dark:bg-gray-800 light:bg-white text-surface/75 dark:text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="flex justify-between lg:flex-row">
              <Link to="/" className="flex items-center">
                <img src={logo} className="h-16" alt="" />
              </Link>
              {/* <button
                data-collapse-toggle="navbar"
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button> */}
              <div className="lg:hidden me-2 flex ms-auto items-center">
                <ThemeToggleButton></ThemeToggleButton>
              </div>

              <div className="flex justify-center items-center lg:hidden">
                <div className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white p-2 hover:bg-slate-200">
                  <div className="space-y-2 flex justify-center items-center flex-col">
                    <span className="block h-1 w-8 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                    <span className="block h-1 w-6 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-8 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden w-full lg:flex lg:pl-11 max-lg:mt-1 max-lg:h-screen max-lg:overflow-y-auto"
              id="navbar"
            >
              <ul className="flex lg:items-center lg:justify-center flex-col max-lg:gap-4 max-lg:pt-4 max-lg:mb-4 lg:mt-0 lg:flex-row lg:mx-auto ">
                <li>
                  <Link
                    to="/home"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base font-medium transition-all duration-300 dark:hover:text-gray-300 hover:text-gray-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left  font-medium transition-all duration-300 dark:hover:text-gray-300 hover:text-gray-500"
                  >
                    About us
                  </Link>
                </li>
              </ul>
              <div className="flex lg:items-center w-full justify-start flex-col lg:flex-row gap-4 lg:w-max max-lg:gap-4 lg:ml-14 lg:justify-end">
                <ThemeToggleButton></ThemeToggleButton>

                {token ? (
                  <Button onClick={handleLogout}>Logout</Button>
                ) : (
                  <div>
                    <Link to="/login">
                      <button className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                        Login
                      </button>
                    </Link>

                    <Link to="/register">
                      <button className="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-700">
                        SignUP
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



