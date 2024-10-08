import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import logo from "../../assets/logo/bike-zone.png";

const navigation = [
  { name: "Home", role: "public", href: "/home", current: false },
  {
    name: "Bikes",
    role: "public",
    href: "/bike-management",
    current: false,
  },
  { name: "About Us", role: "public", href: "/about-us", current: false },
];

export default function PrivateNav() {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/login"></Navigate>;
  };
  return (
    <Disclosure
      as="nav"
      className="bg-zinc-50 text-center text-surface/75 dark:text-white/75 dark:bg-gray-800"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-12 w-auto" />
            </div>
            <div className="hidden  sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  if (item.role === "public") {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={`${
                          item.current
                            ? "bg-gray-900 whitespace-nowrap "
                            : " hover:bg-gray-600 hover:text-white"
                        } rounded-md px-2 py-2 text-sm font-medium`}
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  if (item.role === user?.role) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={`${
                          item.current
                            ? "bg-gray-900 whitespace-nowrap "
                            : " hover:bg-gray-700 hover:text-white"
                        } rounded-md px-2 py-2 text-sm font-medium`}
                      >
                        {item.name}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="me-4">
            <Link to={`${user?.role}/dashboard`}>
              <p className="block px-4 py-2 text-sm text-gray-200 bg-blue-500 rounded-lg  data-[focus]:bg-gray-100">
                Dashboard
              </p>
            </Link>
          </div>
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
              <button
                type="button"
                className="relative me-2 rounded-full bg-white dark:bg-gray-900  p-1   "
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              {/* Profile dropdown */}
              <Menu as="div" className="relative text-start ml-3">
                <div>
                  <MenuButton className="relative  flex rounded-full bg-gray-800 text-sm ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className=" border-b-2">
                    <p className="block text-md font-bold px-4 py-2 text-gray-700 data-[focus]:bg-gray-100">
                      {user?.userEmail}
                    </p>
                  </div>
                  <MenuItem>
                    <Link
                      to={`/${user?.role}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  {user?.role == "admin" ? (
                    <div>
                      <MenuItem>
                        <Link
                          to="/admin/manage-user"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          User Management
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/admin/bike-management"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Bike Management
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/admin/coupon-management"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Coupon Management
                        </Link>
                      </MenuItem>
                    </div>
                  ) : null}

                  <MenuItem>
                    <p
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </p>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            if (item.role == "public") {
              return (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium`}
                >
                  {item.name}
                </DisclosureButton>
              );
            }
            if (item.role == user?.role) {
              return (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium`}
                >
                  {item.name}
                </DisclosureButton>
              );
            }
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
