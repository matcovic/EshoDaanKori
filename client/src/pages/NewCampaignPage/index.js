import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";
// import "../../pages/SIgnIn/SignIn.css";
import keyIcon from "../../assets/icons/ico-key.svg";
import threeDots from "../../assets/icons/ico-3dots2.svg";
import "./newCampaign.css";

const KeyIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={keyIcon} />
  </i>
);

const NewCampaign = () => {
  return (
    <div className="body-background">
      <section id="campaign-section">
        <div className="sample">
          <div className="campaign-box campaign-box-medium campaign-box-small">
            <h2>START A NEW CAMPAIGN</h2>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>What’s your fundraiser title?</label>
                  <Input placeholder="Ex: Need money for sex " />
                </Form.Field>
                <Form.Field>
                  <label>What’s your fundraiser title?</label>
                  <Input
                    icon="map marker alternate"
                    placeholder="Enter your location "
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label="What is the fundraiser for?"
                  placeholder="Choose a category"
                />

                <Form.Field>
                  <label>Set your fundraising goal</label>
                  <Input
                    icon="dollar"
                    iconPosition="left"
                    placeholder="Enter your location "
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field
                control={TextArea}
                label="Tell your story"
                placeholder="Tell us more about you..."
              />

              <Form.Field>
                <label>Add a cover photo</label>
                <div className="btn-type5">
                  <input type="file" className="picture-upload" />
                  <span>+</span>
                  <br />
                  <span>
                    Drag and drop or upload a photo that best represents your
                    campaign.
                  </span>
                </div>
              </Form.Field>

              <Form.Field>
                <label>Add more photos (optional)</label>
                <div className="btn-type5">
                  <input type="file" className="picture-upload" />
                  <span>+</span>
                  <br />
                  <span>
                    Drag and drop or upload a photo that best represents your
                    campaign.
                  </span>
                </div>
              </Form.Field>
              <Form.Group>
                <label>who are you fundraising for?</label>
                <Form.Field control={Checkbox} label="Yourself" />
                <Form.Field control={Checkbox} label="Someone else" />
              </Form.Group>
              <Form.Field>
                <button className="btn btn-type1">
                  PROCEED TO PAYMENT OPTIONS
                </button>
              </Form.Field>
            </Form>

            <i>
              <img className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCampaign;
