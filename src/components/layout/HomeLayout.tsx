import Footer from "@/pages/Shared/Footer";
import Navbar from "@/pages/Shared/Navbar";
import PrivateNav from "@/pages/Shared/PrivateNav";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <PrivateNav></PrivateNav>
      
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;