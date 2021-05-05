import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import Intro from "./components/Intro";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import { landingPageInitialContent } from "./data/data";

function LandingPage() {
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
    <div>
      <Intro
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
