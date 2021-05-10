import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import Intro from "./components/Intro";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import { landingPageInitialContent } from "./data/data";
import BannerCarousel from "./components/BannerCarousel";

function LandingPage() {
  const introSection = {
    images: [
      // { intro_img_1 },
      // { intro_img_2 },
      // { intro_img_3 },
      // { intro_img_4 },
      "https://images.hdqwalls.com/wallpapers/tengen-jujutsu-kaisen-4k-xn.jpg",
      "https://c4.wallpaperflare.com/wallpaper/787/854/424/jujutsu-kaisen-satoru-gojo-anime-boys-anime-girls-hd-wallpaper-preview.jpg",
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
      {/* <Intro
        slogan={content.slogan}
        sloganDescription={content.sloganDescription}
      /> */}

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
