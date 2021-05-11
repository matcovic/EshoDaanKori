import React from "react";
import { Input, Message, TextArea } from "semantic-ui-react";

const contactUs = () => {
  return (
    <div className="background-signup">
      <section id="contactUs-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>Contact Us</h1>

            <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeA0PKTbcJJcm7gL6OaNyu1DiBqwYeFbBf5UhAfhVHxNVA7Ug/formResponse">
              <div>
                <input
                  name="entry.2005620554"
                  placeholder="Email Address*"
                  className="input-length"
                />
              </div>

              <div>
                <input
                  name="entry.1045781291"
                  placeholder="Your Name*"
                  className="input-length"
                  type="text"
                />
              </div>

              <div>
                <textarea
                  name="entry.839337160"
                  placeholder="Message*"
                  className="input-length"
                  type="text"
                />
              </div>

              <div>
                <button type="submit" className=" btn btn-type1 input-length">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default contactUs;
