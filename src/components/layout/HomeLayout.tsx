import Footer from "@/pages/Shared/Footer";

import PrivateNav from "@/pages/Shared/PrivateNav";
import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";


const HomeLayout = () => {
  return (
    <div className="light">

      {/* <PrivateNav></PrivateNav> */}
      <Navbar></Navbar>
      
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;