import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  Form,
  Input,
  Message,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";
import threeDots from "../../assets/icons/ico-3dots2.svg";
import { convertMultipleImagesToB64, getBase64 } from "../../util/util";
import "./newCampaign.css";
import kebabCase from "kebab-case";
import ImageUploader from "react-images-upload";

// https://stackoverflow.com/questions/64208697/uploading-a-file-using-only-the-input-field-react-hook-form
//-----------for validation------------------
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(15, "Title Too short")
    .max(30, "Title Too long"),
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
  { key: "x", text: "Entertainment", value: "s" },
];

var coverImage;
var optionalImages = [];

function getPreviousValues(props) {
  // if status is 2, it means that the campaign page is opened for editing only
  if (props.location.state.status === 2) {
    console.log(props);
    const title = kebabCase(props.match.params.fundraiserTitle);
    console.log(title);

    const post = props.location.state.props;
    const form = {
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
    return null;
  }
}

const NewCampaign = (props) => {
  console.log(props);
  const [fundraisingFor, setFundraisingFor] = useState(
    getPreviousFundraisingFor(props)
  );
  const [form, setFormContent] = useState(getPreviousValues(props));
  const [category, setCategory] = useState();
  const [redirect, setRedirect] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  const [pictures, setPictures] = useState([]);
  const [Coverpicture, setCoverPicture] = useState([]);

  const [pictureCount, setPictureCount] = useState(0);
  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
    console.log(pictures);

    setPictureCount(picture.length);
    console.log(pictureCount + "Hoga");
  };

  const onDropCoverPhoto = (picture) => {
    setCoverPicture([...Coverpicture, picture]);
  };

  function onDropdownChange(event) {
    console.log(event.target.textContent);
    setCategory(event.target.textContent);
  }

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location = "/";
  }

  // handles radio button changes
  const handleChange = (event, { value }) => {
    setFundraisingFor(value);
  };

  // handles input field changes
  function onChange(event) {
    const { value, name } = event.target;
    console.log(value + " " + name);

    // console.log("DropDown Value:");
    // console.log(event.target.textContent);

    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    console.log(pictureCount + "wowasa");
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
        setErrorBox(true);
        console.log(form);
        console.log("on continue click");
        form.fundraisingFor = fundraisingFor;
        console.log(form);
        form.coverPhoto = await getBase64(coverImage);
        form.optionalPhotos = await convertMultipleImagesToB64(optionalImages);
        setRedirect(true);
      }
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
                    value={form.title}
                    onChange={onChange}
                    placeholder="Ex: Need money for sex "
                  />
                </Form.Field>
                <Form.Field>
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
                  defaultValue={options[1].value}
                />

                <Form.Field>
                  <label>Set your fundraising goal</label>
                  <Input
                    name="fundraisingGoal"
                    value={form.fundraisingGoal}
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
                value={form.story}
                label="Tell your story"
                placeholder="Tell us more about you..."
              />

              <Form.Field>
                <label>Add a cover photo</label>
                <ImageUploader
                  {...props}
                  buttonText="Choose images"
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  onChange={onDropCoverPhoto}
                  withPreview={true}
                  singleImage={true}
                />
              </Form.Field>

              <Form.Field>
                <label>Add more photos (optional)</label>

                <ImageUploader
                  {...props}
                  buttonText="Choose images"
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  onChange={onDrop}
                  withPreview={true}
                />
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
