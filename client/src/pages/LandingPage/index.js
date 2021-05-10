import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import { landingPageInitialContent } from "./data/data";
import BannerCarousel from "./components/BannerCarousel";

function LandingPage() {
  const introSection = {
    images: [
      "https://res.cloudinary.com/pixieum-studios/image/upload/v1620670988/landing_page/3_poeuqc.png?fbclid=IwAR394gr7xGYGYmprZ8CPxuyLvUwSU6lNq9wuh6FgIyYS_tdzQxFeoM8S0qM",
      "https://res.cloudinary.com/pixieum-studios/image/upload/v1620670988/landing_page/4_dzl4zq.png?fbclid=IwAR1uJDjQKw0fEgtOyQL_ixDYRNdvNMRB4yN12JNM9_0sKtawlj9sFq-ajAw",
      "https://res.cloudinary.com/pixieum-studios/image/upload/v1620670987/landing_page/1_nmd6lb.png?fbclid=IwAR3fzjdlhNb0Kx2j8LivKvfckpZhzlE-16z0N3QCjqeotTElBbXrxmuKw9o",
      "https://res.cloudinary.com/pixieum-studios/image/upload/v1620670988/landing_page/2_p6pndz.png?fbclid=IwAR2uISRSDEB6DqhFaGQnc2XVLp6L5YgQSW9RnbdAQ29vbP0wxF-i2VQ9gOk",
    ],
  };

  const [content, setContent] = useState(landingPageInitialContent);
  // this is called as soon as the components load up.
  useEffect(() => {
    let isMounted = true;
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.get("/api/landing");
      console.log(data.slogan);
      if (isMounted) setContent(data);
    };
    fetchContent();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <div className="landing-page">
      <BannerCarousel
        carouselImages={introSection.images}
        slogan={content.slogan}
        sloganDescription={content.sloganDescription}
      />

      <OurStory ourStory={content.ourStory} />

      <OurVision
        ourPromise={content.ourPromise}
        ourVision={content.ourVision}
      />

      <AvailFundraisers />

      <WhyUs />
    </div>
  );
}

export default LandingPage;
