import HeroSection from "@/components/Home/HeroSection";
import { Badge, Card } from "antd";
import { Banner } from "./banner/Banner";
import CustomerReviews from "./testimonials/CustomerReviews";
import Featured from "./featured/Featured";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Banner></Banner>
      <HeroSection></HeroSection>
      <div className="max-w-xl mx-auto ">
        <Badge.Ribbon text="Hippies">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
      </Badge.Ribbon>
      </div>
      <Featured></Featured>
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default Home;