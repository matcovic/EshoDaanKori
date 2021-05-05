import React, { useEffect } from "react";
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

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const NewCampaign = () => {
  // ------- Effect Hook-------
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
          inputElement.files = e.dataTransfer.files;
          updateOptionalThumbnail(dropZoneElement, e.dataTransfer.files);
        }
        console.log(e.dataTransfer.files);
      });
    });
  });

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
                  options={options}
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
                  <input
                    type="file"
                    name="coverPhoto"
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
                    className="picture-upload"
                    name="optionalphotos"
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
