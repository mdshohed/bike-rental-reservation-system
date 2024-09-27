import HeroSection from "@/components/Home/HeroSection";
import { Badge, Card } from "antd";
import { Banner } from "./banner/Banner";
import CustomerReviews from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChoseUs/Featured";
import AvailableBikes from "./featured/AvailableBikes";
import Testimonials from "./testimonials/Testimonials";
import ContactSection from "./contactUs/ContactSection";
import Gamified from "./gamifiedFeature/Gamified";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Banner></Banner>
      <AvailableBikes></AvailableBikes>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
       <Gamified></Gamified>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;