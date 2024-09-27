import Footer from "@/pages/Shared/Footer";

import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";
import BackToTop from "@/pages/Shared/BackToTop";


const HomeLayout = () => {
  return (
    <div className="light">

      {/* <PrivateNav></PrivateNav> */}
      <Navbar></Navbar>

      
      <Outlet></Outlet>

      <Footer></Footer>

      <BackToTop></BackToTop>
    </div>
  );
};

export default HomeLayout;