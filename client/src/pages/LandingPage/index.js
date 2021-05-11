import React, { useState, useEffect } from "react";
import WhyUs from "./components/WhyUs";
import axios from "axios";
import OurStory from "./components/OurStory";
import OurVision from "./components/OurVision";
import AvailFundraisers from "./components/AvaiFundraisers";
import { landingPageInitialContent } from "./data/data";
import { Header, Input, Message, Modal } from "semantic-ui-react";
import { EmailIcon } from "../../assets/assets";
import BannerCarousel from "./components/BannerCarousel";
import { notify } from "../../util/util";
import * as yup from "yup";
import { Helmet } from "react-helmet";


yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "Field Invalid",
  },
  email: {},
});

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Please enter your email address"),
});

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
  const [newsLetterPopup, setNewsLetterPopup] = React.useState(false);
  const [newsLetterEmail, setNewsLetterEmail] = useState();
  const [buttonActivation, setButtonActivation] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

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

  async function onNewsLetterConfirmClick(event) {
    console.log(event);
    console.log(newsLetterEmail);

    const isValid = await schema.isValid(newsLetterEmail);
    if (!isValid) {
      schema.validate(newsLetterEmail).catch(function (err) {
        setErrorBox(false);
        setErrorMessage("Please enter a valid email address");
      });
    } else {
      setButtonActivation(true); // disables button
      const subscribeNewsLetter = async () => {
        const { data } = await axios.post("/api/newsletter/subscribe", {
          email: newsLetterEmail,
        });

        if (data.status === 1) {
          console.log(data.message);
          // window.location.replace("/");
          setButtonActivation(false); // enables button
          setNewsLetterPopup(false);
          notify(data.message, "info");
        } else {
          console.log(data.status);
          console.log(data.message);
          setButtonActivation(true); // enables button
          notify(data.message, "error");
        }
      };

      subscribeNewsLetter();
    }
  }

  function onChangeEmail(event) {
    const { value } = event.target;
    setNewsLetterEmail(value);
  }

  return (
    <div className="landing-page">
     <Helmet>
        <meta charSet="utf-8" />
        <title>EshoDaanKori</title>
      </Helmet>
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
              name="email"
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
          <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default LandingPage;
