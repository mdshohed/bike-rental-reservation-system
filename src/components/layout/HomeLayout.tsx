import Footer from "@/pages/Shared/Footer";
import Navbar from "@/pages/Shared/Navbar";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;