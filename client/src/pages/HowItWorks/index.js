import React from "react";
import HowItWorksType1 from "./component/HowItWorksType1";
import FundImage1 from "./component/FundImage1";
import HowItWorksType2 from "./component/HowItWorksType2";
import FundImage2 from "./component/FundImage2";
import fundstep1 from "../../assets/images/fundstep1.svg";
import fundstep2 from "../../assets/images/fundstep2.svg";
import donatestep1 from "../../assets/images/donatestep1.svg";
import donatestep2 from "../../assets/images/donatestep2.svg";
import { Helmet } from "react-helmet";


const HowItWorks = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>How it Works</title>
      </Helmet>
      {/* <!-- How to Fund Raise --> */}
      <section id="how-to-fundraise-section">
        <h2>HOW TO FUNDRAISE?</h2>
        <div className="container-fluid">
          <div className="row row-flex">
            <h2 className="step-no-text">Step 01</h2>
            <HowItWorksType1
              desctiption="Create an account.
                           All you need is a valid email address and your
                           national ID card number or birth certificate number"
            />
            <FundImage1 Image={fundstep1} />

            {/* <!-- step 2 --> */}
            <div className="divider-custom">
              <div className="divider-custom-line"></div>
              <h2 className="step-no-text">Step 02</h2>
              <div className="divider-custom-line"></div>
            </div>
            <FundImage2 Image={fundstep2} />
            <HowItWorksType2
              description="Press the “START A NEW CAMPAIGN” Button once you are in.
            Enter necessary information into a form. And you are done!"
            />
          </div>
        </div>
      </section>

      {/* <!-- How to Donate --> */}
      <section id="how-to-donate-section">
        <h2>HOW TO FUNDRAISE?</h2>
        <div className="container-fluid">
          <div className="row row-flex">
            <h2 className="step-no-text">Step 01</h2>

            <HowItWorksType1 desctiption="Click on the fundraiser you wish to donate." />
            <FundImage1 Image={donatestep1} />

            {/* <!-- step 2 --> */}
            <div className="divider-custom">
              <div className="divider-custom-line"></div>
              <h2 className="step-no-text">Step 02</h2>
              <div className="divider-custom-line"></div>
            </div>
            <FundImage2 Image={donatestep2} />
            <HowItWorksType2
              description="A new window will open containing the details of the fundraiser.
            Press on the Donate button to start donating!"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
