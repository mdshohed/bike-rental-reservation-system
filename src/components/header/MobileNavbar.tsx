import { selectCurrentUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Drawer } from "antd";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";


const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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
    <>
      <MdMenu
        onClick={showDrawer}
        className="text-3xl  block md:hidden"
      />

      <Drawer placement="left" title="Close The Navbar" onClose={onClose} open={open}>
        <div className="md:hidden flex flex-col">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              onClick={onClose}
              className={({ isActive }) =>
                `h-full border-b text-center inline-block transition-colors py-5 text-lg ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-slate-900 hover:border-primary hover:text-primary"
                } ${item.protected ? "hidden" : "block"}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
