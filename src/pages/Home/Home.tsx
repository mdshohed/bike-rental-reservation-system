import { Banner } from "./banner/Banner";
import WhyChooseUs from "./whyChoseUs/Featured";
import AvailableBikes from "./featured/AvailableBikes";
import Testimonials from "./testimonials/Testimonials";
import ContactSection from "./contactUs/ContactSection";
import Gamified from "./gamifiedFeature/Gamified";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll smooth
    });
  }, []);

  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains #spin and scroll to the element
    if (location.hash === "#spin") {
      const element = document.getElementById("spin");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
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

{/* <div class="v-image__image v-image__image--cover" style="background-image: url(&quot;https://www.babu88.app/static/image/wof/wofSpin.gif&quot;); background-position: center center;"></div> */}