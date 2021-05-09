import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Message,
} from "semantic-ui-react";
import threeDots from "../../assets/icons/ico-3dots2.svg";
import { convertMultipleImagesToB64, getBase64 } from "../../util/util";
import "./newCampaign.css";

// https://stackoverflow.com/questions/64208697/uploading-a-file-using-only-the-input-field-react-hook-form

//-----------for validation------------------
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(15, "Too short")
    .max(30, "Too long"),
  location: yup.string().required("Location is required"),
  fundraisingGoal: yup
    .number("Invalid")
    .positive("Invalid")
    .integer("Invalid")
    .required(),
  story: yup.string().required(),
});
//-----------for validation------------------

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

var coverImage;
var optionalImages = [];

const NewCampaign = (props) => {
  console.log(props);
  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location = "/";
  }

  const [fundraisingFor, setFundraisingFor] = useState("Yourself");
  const [form, setFormContent] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  // handles radio button changes
  const handleChange = (event, { value }) => {
    setFundraisingFor(value);
  };

  // handles input field changes
  function onChange(event) {
    // const { value, name } = event.target;
    // console.log(value + " " + name);

    console.log("DropDown Value:");
    console.log(event.target.textContent);

    // setFormContent((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  }

  // handles image upload changes
  function onImageChange(event) {
    const { name } = event.target;

    if (name === "coverPhoto") {
      coverImage = event.target.files[0];
      console.log(coverImage);
    } else if (name === "optionalPhotos") {
      optionalImages = parseFiles(event.target.files);
    }
  }

  function parseFiles(files) {
    Array.from(files).forEach((file) => {
      console.log(`pushing file::: files size-${files.length}`);
      optionalImages.push(file);
    });

    console.log("new content");
    console.log(optionalImages);

    return optionalImages;
  }

  async function onButtonClick(event) {
    event.preventDefault();

    const isValid = await schema.isValid(form);

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
      setErrorBox(true);
      console.log(form);
      console.log("on continue click");
      form.fundraisingFor = fundraisingFor;
      console.log(form);
      form.coverPhoto = await getBase64(coverImage);
      form.optionalPhotos = await convertMultipleImagesToB64(optionalImages);
      setRedirect(true);
    }

    /* 
    //  console.log(images);
       const registerUser = async () => {
      const { data } = await axios.post("/api/auth/register-info", form);
      if (data.status === 1) {
        console.log(data.message);
        window.location.replace("/registration-complete");
      } else {
        console.log(data.message);
      }
    };

    registerUser();  */
  }

  useEffect(() => {
    // ---------------java script for cover image----------------------
    document.querySelectorAll("#userCoverPhoto").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".btn-type5");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }
        // console.log(e.dataTransfer.files);
      });
    });

    // ---------------java script for aditional image----------------------

    document.querySelectorAll("#userOptionalPhotos").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".btn-type5");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateOptionalThumbnail(dropZoneElement, inputElement.files);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          /*  setOtherImages((prev) => {
            console.log(prev);
            return e.dataTransfer.files;
          }); */

          inputElement.files = e.dataTransfer.files;
          updateOptionalThumbnail(dropZoneElement, e.dataTransfer.files);
        }
        console.log(e.dataTransfer.files);
      });
    });
  }, []);

  // --------------------cover thumbnail function----------------------------------
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".photo-thumbnail");

    if (dropZoneElement.querySelector(".drag-drop-text")) {
      dropZoneElement.querySelector(".drag-drop-text").remove();
    }
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("img");
      thumbnailElement.classList.add("photo-thumbnail");
      dropZoneElement.appendChild(thumbnailElement);
    }

    if (file.type.startsWith("image/")) {
      //setCoverPhoto(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.src = reader.result;
      };
    }
  }

  function updateOptionalThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".photo-thumbnail");

    if (dropZoneElement.querySelector(".drag-drop-text")) {
      dropZoneElement.querySelector(".drag-drop-text").remove();
    }

    var i = file.length;

    // shows the preview of the all the images dragged in
    for (var image = 0; image < i; image++) {
      if (file[image].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file[image]);
        // eslint-disable-next-line no-loop-func
        reader.onload = () => {
          thumbnailElement = document.createElement("img");
          thumbnailElement.classList.add("other-photo-thumbnail");
          dropZoneElement.appendChild(thumbnailElement);
          thumbnailElement.src = reader.result;
        };
        //console.log(reader.onload);
      }
    }
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/payment",
          state: form,
        }}
      />
    );
  }

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
                  <Input
                    name="title"
                    onChange={onChange}
                    placeholder="Ex: Need money for sex "
                  />
                </Form.Field>
                <Form.Field>
                  <label>Enter your location</label>
                  <Input
                    name="location"
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
                  onChange={onChange}
                  name="category"
                  options={options}
                  defaultValue={options[1].value}
                />

                <Form.Field>
                  <label>Set your fundraising goal</label>
                  <Input
                    name="fundraisingGoal"
                    onChange={onChange}
                    icon="dollar"
                    iconPosition="left"
                    placeholder="Enter your location "
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field
                name="story"
                onChange={onChange}
                control={TextArea}
                label="Tell your story"
                placeholder="Tell us more about you..."
              />

              <Form.Field>
                <label>Add a cover photo</label>
                <div className="btn-type5">
                  <input
                    type="file"
                    name="coverPhoto"
                    onChange={onImageChange}
                    className="picture-upload"
                    id="userCoverPhoto"
                  />
                  <div className="drag-drop-text">
                    <span>+</span>
                    <br />
                    <span>
                      Drag and drop or upload a photo that best represents your
                      campaign.
                    </span>
                  </div>
                </div>
              </Form.Field>

              <Form.Field>
                <label>Add more photos (optional)</label>
                <div className="btn-type5">
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={onImageChange}
                    className="picture-upload"
                    name="optionalPhotos"
                    id="userOptionalPhotos"
                  />
                  {/* <img className="other-photo-thumbnail" multiple /> */}
                  <div className="drag-drop-text">
                    <span>+</span>
                    <br />
                    <span>
                      Drag and drop or upload a photo that best represents your
                      campaign.
                    </span>
                  </div>
                </div>
              </Form.Field>
              <Form.Group>
                <Form.Field>
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
                <button onClick={onButtonClick} className="btn btn-type1">
                  PROCEED TO PAYMENT OPTIONS
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
              <img alt="three dots" className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCampaign;
