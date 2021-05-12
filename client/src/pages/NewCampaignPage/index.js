import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Message,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";
import twoDots from "../../assets/icons/ico-2dot1.svg";
import { convertMultipleImagesToB64, getBase64, notify } from "../../util/util";
import "./newCampaign.css";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { TakaIcon } from "../../assets/assets.js";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please write a meaningful title.")
    .min(15, "Please write a meaningful title.")
    .max(60, "Please make the title shorter!"),
  location: yup
    .string()
    .required("Location is required")
    .min(5, "Please enter a valid location")
    .max(30, "Please make the title shorter!"),
  fundraisingGoal: yup
    .number("Invalid goal entered. Please enter a number.")
    .positive("Invalid goal entered. Please enter a number.")
    .integer("Invalid goal entered. Please enter a number.")
    .required("Please enter the fundraiser target amount."),
  story: yup
    .string()
    .required()
    .min(50, "Story should be at least 50 character")
    .max(1200, "Your Story is too big"),
});
//-----------for validation------------------

const options = [
  {
    key: "a",
    text: "Accidents & Emergencies",
    value: "Accidents & Emergencies",
  },
  { key: "b", text: "Medical", value: "Medical" },
  { key: "c", text: "Creative", value: "Creative" },
  { key: "d", text: "Education", value: "Education" },
  { key: "e", text: "Volunteer & Service", value: "Volunteer & Service" },
  { key: "f", text: "Animals & Pets", value: "Animals & Pets" },
  { key: "g", text: "Others", value: "Others" },
];

function getPreviousValues(props) {
  // if status is 2, it means that the campaign page is opened for editing only
  if (props.location.state.status === 2) {
    console.log(props);
    const title = props.match.params.fundraiserTitle;
    console.log(title);

    const post = props.location.state.props;
    const form = {
      _id: post._id,
      title: post.title,
      location: post.location,
      fundraisingGoal: post.fundraisingGoal,
      fundraisingFor: post.fundraisingFor,
      story: post.story,
      category: post.category,
    };

    console.log(form);
    return form;
  } else {
    return {};
  }
}

function getPreviousFundraisingFor(props) {
  if (props.location.state.status === 2) {
    return props.location.state.props.fundraisingFor;
  } else {
    return "Yourself";
  }
}

function getOptionalPhotos(props, status) {
  if (status === 2) {
    if (props.location.state.props.optionalPhotos) {
      return props.location.state.props.optionalPhotos;
    }
  }
  return [];
}

const NewCampaign = (props) => {
  const history = useHistory();
  const ref = useRef(null); // for loading bar

  // status === 2 means it came from edit profile window, and values are saved in {props.location.state.props}
  // status === 1 means it came from discover window
  const status = props.location.state.status;

  if (status === 2) {
    console.log("OPTIONAL PHOTOS: ");
    console.log(props.location.state.props.optionalPhotos);
  }

  const [buttonActivation, setButtonActivation] = useState(false);
  const [fundraisingFor, setFundraisingFor] = useState(
    getPreviousFundraisingFor(props)
  );
  const [form, setFormContent] = useState(getPreviousValues(props));
  const [category, setCategory] = useState(
    status === 2 ? props.location.state.props.category : []
  );
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const [optionalPictures, setOptionalPictures] = useState([]);
  const [coverPicture, setCoverPicture] = useState(
    status === 2 ? props.location.state.props.coverPhoto : ""
  );
  const [pictureCount, setPictureCount] = useState(0);

  // used for the default images obtained from the user's edit fundraiser window
  const [coverPictureDefault, setCoverPictureDefault] = useState([
    status === 2 ? props.location.state.props.coverPhoto : "",
  ]);

  const [optionalPicturesDefault, setOptionalPicturesDefault] = useState(
    getOptionalPhotos(props, status)
  );

  // cover photo change listener
  const onDropCoverPhoto = (picture, data) => {
    console.log("deleting: " + picture);
    setCoverPicture(picture);
    setCoverPictureDefault(data);
  };

  // optional photos change listener
  const onDropOptionalPhotos = (picture) => {
    setOptionalPictures(picture);
    setPictureCount(picture.length);
  };

  // sets dropdown category
  const onDropdownChange = (event) => {
    console.log(event.target.textContent);
    setCategory(event.target.textContent);
  };

  function onDelete(event) {
    console.log("delete clicked");
  }
  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location.replace("/");
  }

  // handles radio button changes
  const handleChange = (event, { value }) => {
    setFundraisingFor(value);
  };

  // handles input field changes
  function onChange(event) {
    const { value, name } = event.target;
    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function onButtonClick(event) {
    event.preventDefault();

    const isValid = await schema.isValid(form);
    // const isValid = true; //for debug
    console.log("optional picture count: " + pictureCount);
    if (pictureCount > 5) {
      setErrorBox(false);
      setErrorMessage("Only 5 Photos are allowed");
    } else {
      setErrorBox(true);
      if (!isValid) {
        schema.validate(form).catch(function (err) {
          console.log("Error Name:");
          console.log(err.name); // => 'ValidationError'
          console.log("Error error");
          console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
          setErrorBox(false);
          setErrorMessage(err.errors);
        });
      } else {
        ref.current.continuousStart();

        form.fundraisingFor = fundraisingFor;
        form.category = category;
        console.log("coverpic:");
        console.log(coverPicture);
        console.log(typeof coverPicture[0]);

        // means user selected a new picture
        if (coverPicture[0] instanceof File) {
          console.log("converting coverpic to b64:");
          form.coverPhoto = await getBase64(
            coverPicture ? coverPicture[0] : undefined
          );
        }

        form.optionalPhotos = await convertMultipleImagesToB64(
          optionalPictures
        );

        form.previousOptionalImages = optionalPicturesDefault;
        console.log("Form: ");
        console.log(form);
        // status == 2 means editing post
        if (status === 2) {
          setButtonActivation(true); // disables button

          // save changes to database
          const editChanges = async () => {
            const { data } = await axios.post(
              `${process.env.REACT_APP_API_DOMAIN}/api/campaign/edit-campaign`,
              form,
              { withCredentials: true }
            );
            if (data.status === 1) {
              console.log(data.message);
              notify(data.message, "success");
              setButtonActivation(false);
            } else {
              console.log(data.status);
              console.log(data.message);
              notify(data.message, "error");
            }
            setButtonActivation(true); // disables button
            ref.current.complete();
          };

          editChanges();
        } else {
          ref.current.complete();
          history.push({
            pathname: "/payment",
            state: form,
          });
        }
      }
    }
  }

  return (
    <div className="body-background">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Start A New Campaign</title>
      </Helmet>
      <section id="campaign-section">
        <LoadingBar color="#FF641A" ref={ref} shadow={true} height={4} />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="sample">
          <div className="campaign-box campaign-box-medium campaign-box-small">
            <h2>START A NEW CAMPAIGN</h2>
            <Form>
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>What’s your fundraiser title?</label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    placeholder="Enter a title"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Enter your location</label>
                  <Input
                    name="location"
                    value={form.location}
                    onChange={onChange}
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
                  onChange={onDropdownChange}
                  name="category"
                  options={options}
                  defaultValue={category}
                  value={category}
                  required
                />

                <Form.Field required>
                  <label>Set your fundraising goal</label>
                  <Input
                    name="fundraisingGoal"
                    value={form.fundraisingGoal}
                    onChange={onChange}
                    icon={TakaIcon}
                    iconPosition="left"
                    placeholder="Enter your location "
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field
                name="story"
                onChange={onChange}
                control={TextArea}
                value={form.story}
                label="Tell your story"
                placeholder="Tell us more about you..."
                required
              />

              <Form.Field required>
                <label>Add a cover photo</label>
                <ImageUploader
                  {...props}
                  label="Max file size: 5MB. Accepted extensions: PNG | JPG"
                  buttonText="Choose image"
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  onChange={onDropCoverPhoto}
                  withPreview={coverPicture === "" ? false : true}
                  singleImage={true}
                  defaultImages={coverPictureDefault}
                />
              </Form.Field>

              <Form.Field>
                <label>Add more photos (optional)</label>
                <ImageUploader
                  {...props}
                  label="Max file count: 5. Accepted extensions: PNG | JPG"
                  buttonText="Choose images"
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  onChange={onDropOptionalPhotos}
                  onDelete={onDelete}
                  withPreview={true}
                  defaultImages={optionalPicturesDefault}
                />
              </Form.Field>
              <Form.Group>
                <Form.Field required>
                  <label>Who are you fundraising for?</label>
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Yourself"
                    name="radioGroup"
                    value="Yourself"
                    checked={fundraisingFor === "Yourself"}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Someone else"
                    name="radioGroup"
                    value="Someone else"
                    checked={fundraisingFor === "Someone else"}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <button
                  disabled={buttonActivation}
                  onClick={onButtonClick}
                  className="btn btn-type1"
                >
                  {status === 2
                    ? "SAVE CHANGES"
                    : " PROCEED TO PAYMENT OPTIONS"}{" "}
                </button>
              </Form.Field>
            </Form>

            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
            <i>
              <img alt="three dots" className="three-dots" src={twoDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCampaign;
