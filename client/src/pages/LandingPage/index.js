import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import Intro from "./components/Intro";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import { landingPageInitialContent } from "./data/data";
import { Header, Input, Modal } from "semantic-ui-react";
import { EmailIcon } from "../../assets/assets";

function LandingPage() {
  const [content, setContent] = useState(landingPageInitialContent);
  const [newsLetterPopup, setNewsLetterPopup] = React.useState(false);
  const [newsLetterEmail, setNewsLetterEmail] = useState();
  const [buttonActivation, setButtonActivation] = useState("");

  // this is called as soon as the components load up.
  useEffect(() => {
    let isMounted = true;
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.get("/api/landing");
      console.log(data);
      console.log(data.result.slogan);
      if (data.newsLetterShown === "shown") {
        console.log("news letter shown");
        setNewsLetterPopup(false);
      } else {
        setNewsLetterPopup(true);
      }
      if (isMounted) setContent(data.result);
    };
    fetchContent();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  function onNewsLetterConfirmClick(event) {
    console.log(event);
    console.log(newsLetterEmail);
    setButtonActivation(""); // disables button

    const subscribeNewsLetter = async () => {
      const { data } = await axios.post("/api/newsletter/subscribe", {
        email: newsLetterEmail,
      });

      if (data.status === 1) {
        console.log(data.message);
        // window.location.replace("/");
        setButtonActivation("false"); // enables button
        setNewsLetterPopup(false);
      } else {
        console.log(data.status);
        console.log(data.message);
        setButtonActivation("false"); // enables button
        setNewsLetterPopup(false);
      }
    };

    subscribeNewsLetter();
  }

  function onChangeEmail(event) {
    const { value } = event.target;
    setNewsLetterEmail(value);
  }

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
      <Modal
        id="modal-section"
        onOpen={() => setNewsLetterPopup(true)}
        open={newsLetterPopup}
        onClose={() => {
          console.log("MODAL CLOSED");
          setNewsLetterPopup(false);
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>News Letter</Header>
            <p>
              Our platform completely depends on individuals. The more people we
              have, the greater funds we can raise and help people to a greater
              extent. Subscribe to our newsletter to get notified of new
              campaigns
            </p>
            {/* <p>Is it okay to use this photo?</p> */}
            <Input
              placeholder="Enter email"
              iconPosition="left"
              onChange={onChangeEmail}
              icon={EmailIcon}
              className="input-length"
            />
          </Modal.Description>
          <button
            onClick={onNewsLetterConfirmClick}
            className="btn btn-type1 modal-btn"
            disabled={buttonActivation}
          >
            CONFIRM
          </button>

          <div className="modal-not-interested">
            <span onClick={() => setNewsLetterPopup(false)}>
              I’M NOT INTERESTED
            </span>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default LandingPage;
