import HeroSection from "@/components/Home/HeroSection";
import { Badge, Card } from "antd";
import { Banner } from "./banner/Banner";
import CustomerReviews from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChoseUs/Featured";
import AvailableBikes from "./featured/AvailableBikes";
import Testimonials from "./testimonials/Testimonials";
import ContactSection from "./contactUs/ContactSection";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Banner></Banner>
      {/* <HeroSection></HeroSection> */}
      {/* <div className="max-w-xl mx-auto ">
        <Badge.Ribbon text="Hippies">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
      </Badge.Ribbon>
      </div> */}
      {/* <KeyFeatures></KeyFeatures> */}
      <AvailableBikes></AvailableBikes>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;