import Footer from "@/pages/Shared/Footer";
import PrivateNav from "@/pages/Shared/PrivateNav";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  return (
    <div className="light">

      <PrivateNav></PrivateNav>
      
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;