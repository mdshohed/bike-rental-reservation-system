import { Flex, Spin } from "antd";
import "./GlobalLoaderStyles.css";

const GlobalLoader = () => {
  return (
    <div className="global-loader-overlay">
      <div className="three-body">
        {/* <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div> */}
        <Flex align="center" className="" gap="middle">
            <Spin  />
          </Flex>
      </div>
    </div>
  );
};

export default GlobalLoader;
