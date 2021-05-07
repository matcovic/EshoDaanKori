import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";
import threeDots from "../../assets/icons/ico-3dots2.svg";
import "./newCampaign.css";

// https://stackoverflow.com/questions/64208697/uploading-a-file-using-only-the-input-field-react-hook-form

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const NewCampaign = ({ isAuthenticated }) => {
  const [value, setValue] = useState(null);
  const handleChange = (event, { value }) => {
    setValue(value);
    console.log(value);
  };

  const [form, setFormContent] = useState({});

  function onChange(event) {
    const { value, name } = event.target;
    console.log("hello");

    setFormContent((prevContent) => {
      if (name === "title") {
        return {
          title: value,
          location: prevContent.location,
          fundraisingGoal: prevContent.fundraisingGoal,
          story: prevContent.story,
          coverPhoto: prevContent.coverPhoto,
          optionalPhotos: prevContent.optionalPhotos,
        };
      } else if (name === "location") {
        return {
          title: prevContent.title,
          location: value,
          fundraisingGoal: prevContent.fundraisingGoal,
          story: prevContent.story,
          coverPhoto: prevContent.coverPhoto,
          optionalPhotos: prevContent.optionalPhotos,
        };
      } else if (name === "fundraisingGoal") {
        return {
          title: prevContent.title,
          location: prevContent.location,
          fundraisingGoal: value,
          story: prevContent.story,
          coverPhoto: prevContent.coverPhoto,
          optionalPhotos: prevContent.optionalPhotos,
        };
      } else if (name === "story") {
        return {
          title: prevContent.title,
          location: prevContent.location,
          fundraisingGoal: prevContent.fundraisingGoal,
          story: value,
          coverPhoto: prevContent.coverPhoto,
          optionalPhotos: prevContent.optionalPhotos,
        };
      } else if (name === "coverPhoto") {
        return {
          title: prevContent.title,
          location: prevContent.location,
          fundraisingGoal: prevContent.fundraisingGoal,
          story: prevContent.story,
          coverPhoto: event.target.files[0],
          optionalPhotos: prevContent.optionalPhotos,
        };
      } else if (name === "optionalPhotos") {
        console.log("previousContent: ");
        console.log(prevContent.optionalPhotos);
        return {
          title: prevContent.title,
          location: prevContent.location,
          fundraisingGoal: prevContent.fundraisingGoal,
          story: prevContent.story,
          coverPhoto: prevContent.coverPhoto,
          optionalPhotos: event.target.files,
        };
      }
    });
  }

  function onButtonClick(event) {
    event.preventDefault();
    //  form.coverPhoto = coverPhoto;
    //  form.otherImages = images;
    console.log("on continue click");
    console.log(form);
    console.log("iother mages: ");

    //  console.log(images);
    /*   const registerUser = async () => {
      const { data } = await axios.post("/api/auth/register-info", form);
      if (data.status === 1) {
        console.log(data.message);
        window.location.replace("/registration-complete");
      } else {
        console.log(data.message);
      }
    };

    registerUser(); */
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

  if (!isAuthenticated) {
    // return <Redirect to="/" />;
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
                  options={options}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    checked={value === "Yourself"}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Someone else"
                    name="radioGroup"
                    value="Someone else"
                    checked={value === "Someone else"}
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

            <i>
              <img alt="three dots" className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};
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
  // if (!thumbnailElement) {
  //   thumbnailElement = document.createElement("img");
  //   thumbnailElement.classList.add("other-photo-thumbnail");
  //   dropZoneElement.appendChild(thumbnailElement);
  // }

  // if (file.type.startsWith("image/")) {
  var i = file.length;
  // console.log(i);
  for (var image = 0; image < i; image++) {
    // console.log(file[image]);
    const reader = new FileReader();
    reader.readAsDataURL(file[image]);
    console.log(file[image]);
    reader.onload = () => {
      thumbnailElement = document.createElement("img");
      thumbnailElement.classList.add("other-photo-thumbnail");
      dropZoneElement.appendChild(thumbnailElement);
      thumbnailElement.src = reader.result;
    };
    console.log(reader.onload);
  }
  // }
}

export default NewCampaign;
