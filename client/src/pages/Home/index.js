import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import Intro from "./components/Intro";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import {landingPageInitialContent} from "./data/data"

function Home() {
  const [content, setContent] = useState(landingPageInitialContent);
  // this is called as soon as the components load up.
  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.get("/api/landing");
      console.log(data.slogan);
      setContent(data);
    };
    fetchContent();
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

export default Home;
