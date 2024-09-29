import Footer from "@/pages/Shared/Footer";

import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";
import BackToTop from "@/pages/Shared/BackToTop";
import TopBanner from "../header/TopBanner";


const HomeLayout = () => {
  return (
    <div className="light">

      {/* <PrivateNav></PrivateNav> */}
      <TopBanner></TopBanner>
      <Navbar></Navbar>

      
      <Outlet></Outlet>

      <Footer></Footer>

      <BackToTop></BackToTop>
    </div>
  );
};

export default HomeLayout;