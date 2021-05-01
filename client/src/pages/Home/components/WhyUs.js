import React from "react";
import {whyUs} from "../data/data";

function WhyUsComp(props) {
  return (
    <div className="col-md-4 col-sm-6 col-xs-12">
      <div className="why-us-grid">
        <img className="why-us-icon" src={props.icon} alt="" />
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}


// function for mapping why-us boxes
function createWhyUsEntry(whyUsBox) {
  return (
    <WhyUsComp
      key={whyUsBox.id}
      icon={whyUsBox.icon}
      title={whyUsBox.title}
      desc={whyUsBox.desc}
    />
  );
}

function WhyUs() {
  return (
    <section id="why-us-section">
      <div className="divider-custom">
        <h2>WHY US?</h2>
        <div className="divider-custom-line"></div>
      </div>

      <div className="container-fluid">
        <div className="row row-flex">{whyUs.map(createWhyUsEntry)}</div>
      </div>
    </section>
  );
}

export default WhyUs;
