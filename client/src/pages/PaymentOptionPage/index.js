import React, { useRef } from "react";
import { Input, Dropdown, List, Message, Header } from "semantic-ui-react";
import "./payment.css";
import Bkash from "../../assets/icons/ico-bkash.svg";
import Nagad from "../../assets/icons/ico-nagad.svg";
import Rocket from "../../assets/icons/ico-rocket.svg";
import NumberLists from "./components/ListofNumbers";
import twoDots from "../../assets/icons/ico-2dots2.svg";
import axios from "axios";
import { notify } from "../../util/util";
import { useState } from "react";
import { Modal } from "semantic-ui-react";
import LoadingBar from "react-top-loading-bar";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { CopyToClipboard } from "react-copy-to-clipboard";

const phoneRegExp = "[0][1][1-9][0-9]{8}";
const schema = yup.object().shape({
  numb: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(11, "Phone number is too long")
    .min(11, "Phone number is too short")
    .required(),
});

//-----------for validation------------------

const MobileBankingOptions = [
  {
    key: "Bkash",
    value: "Bkash",
    image: {
      src: Bkash,
      alt: "Bkash",
    },
  },
  {
    key: "Nagad",

    value: "Nagad",
    image: {
      src: Nagad,
      alt: "Nagad",
    },
  },
  {
    key: "Rocket",

    value: "Rocket",
    image: {
      src: Rocket,
      alt: "Rocket",
    },
  },
];

function getPreviousPaymentList(props) {
  var list = [];
  if (props.location.state.status === 69) {
    list = [...list, ...props.location.state.fundDetails.paymentOptions];
  }
  return list;
}

const PaymentOptions = (props) => {
  const ref = useRef(null); // for loading bar
  const [paymentOptionsList, setPaymentOptionsList] = useState(
    getPreviousPaymentList(props)
  ); // holds the final numbers
  const [paymentIconKey, setPaymentIcon] = useState("Bkash");
  const [inputField, setInputField] = useState("");
  const [buttonActivation, setButtonActivation] = useState("false"); // disables button while loading
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [shareableLink, setShareableLink] = useState({
    value: ``,
    copied: false,
  });

  if (!(props.location && props.location.state)) {
    window.location.replace("/");
  }

  function onStartCampaignClick(event) {
    event.preventDefault();
    props.location.state.paymentOptions = paymentOptionsList;
    ref.current.continuousStart(); // start loading
    setButtonActivation("");

    if (props.location.state.status === 69) {
      props.location.state.updatePayment = true;
    }

    const startCampaign = async () => {
      var data;
      if (props.location.state.status !== 69) {
        data = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/api/campaign/new-campaign`,
          props.location.state,
          { withCredentials: true }
        );
        data = data.data;
      } else {
        data = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/api/campaign/update-payment-options`,
          {
            paymentOptions: paymentOptionsList,
            _id: props.location.state.fundDetails._id,
          },
          { withCredentials: true }
        );

        data = data.data;
      }

      if (data.status === 1) {
        ref.current.complete(); // end loading
        setErrorBox(true);
        if (props.location.state.status === 69) {
          notify("Payment options updated successfully!", "success");
          setButtonActivation("false");
        } else {
          setShareableLink({
            value: `https://eshodaankori.netlify.app/fundraisers/view/${data.result}`,
            copied: false,
          });
          setOpen(true);
        }
      } else {
        ref.current.complete(); // end loading
        setErrorBox(false);
        setErrorMessage(data.message);
        setButtonActivation("false");
      }
    };

    startCampaign();
  }

  //-----------------delete Number list Function---------------
  function onDeletNumberClick(index, e) {
    e.preventDefault();
    const newList = paymentOptionsList.filter((item, indx) => indx !== index);
    setPaymentOptionsList(newList);
  }

  function onChange(e) {
    setInputField(e.target.value);
  }

  /**
   *
   * @param {*} event Add More button
   */
  async function onAddMoreClick(event) {
    event.preventDefault();
    const isValid = await schema.isValid({ numb: inputField });
    if (!isValid) {
      schema.validate({ numb: inputField }).catch(function (err) {
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      const newList = paymentOptionsList.concat({
        number: inputField,
        icon: paymentIconKey,
      });
      setErrorBox(true);
      setPaymentOptionsList(newList);
      setInputField("");
    }
  }

  function dropDownSelect(e, data) {
    setPaymentIcon(data.value);
  }

  const onCopy = () => {
    setShareableLink((prevState) => ({
      ...prevState,
      copied: true,
    }));

    notify(
      "Link copied! 🔗 Share it with your friends and family.",
      "info",
      "/",
      "bottom-right"
    );
  };

  return (
    <div className="payment-background">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Options</title>
      </Helmet>
      <LoadingBar color="#FF641A" ref={ref} shadow={true} height={4} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <section id="payment-section">
        <div className="sample">
          <div className="payment-box payment-box-medium payment-box-small">
            <h2>PAYMENT OPTIONS</h2>
            <p>
              For now, we only offer mobile banking options. You can directly
              receive the payment through the following services.
            </p>
            <h5> We dont charge anything.</h5>

            <form>
              <div className="option-section">
                <span>
                  <Dropdown
                    inline
                    options={MobileBankingOptions}
                    defaultValue={MobileBankingOptions[0].value}
                    onChange={dropDownSelect}
                  />
                </span>
                <Input
                  value={inputField}
                  className="input-length"
                  placeholder="Enter your number. Ex- 019XXXXXXXX"
                  onChange={onChange}
                  required
                  name="userNumber"
                />
              </div>
              <button
                onClick={onAddMoreClick}
                disabled={!buttonActivation}
                className="btn btn-type1"
              >
                ADD MORE
              </button>
            </form>
            <div className="number-list">
              <p>PAYMENT OPTIONS ADDED</p>
              <div className="number-listView">
                <List verticalAlign="middle">
                  {paymentOptionsList.map((item, index) => (
                    <NumberLists
                      OnClickFunction={onDeletNumberClick.bind(this, index)}
                      icon={mapIcon(item.icon)}
                      number={item.number}
                    />
                  ))}
                </List>
              </div>
            </div>
            <div className="campaign-start">
              <p>
                NOTE: If your account reaches its limit, you can always change
                it from your profile
              </p>
              <form>
                <button
                  onClick={onStartCampaignClick}
                  className="btn btn-type1"
                  disabled={!buttonActivation || !paymentOptionsList.length}
                >
                  {props.location.state.status === 69
                    ? "SAVE CHANGES"
                    : "START CAMPAIGN"}
                </button>
              </form>
            </div>
            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
            <i>
              <img
                alt="start campaign button"
                className="three-dots"
                src={twoDots}
              />
            </i>
          </div>
        </div>
      </section>

      <Modal
        onOpen={() => setOpen(true)}
        open={open}
        onClose={() => {
          window.location.replace("/");
          setOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>SUCCESS</Header>
            <p>
              You have successfully created a campaign. Make sure to invite your
              friends and family!
            </p>
          </Modal.Description>

          <CopyToClipboard onCopy={onCopy} text={shareableLink.value}>
            <button className="btn btn-type4 modal-btn">COPY LINK</button>
          </CopyToClipboard>

          <button
            onClick={(event) => {
              event.preventDefault();
              window.location.replace("/");
            }}
            className="btn btn-type1 modal-btn"
          >
            HOME
          </button>
        </Modal.Content>
      </Modal>
    </div>
  );
};

function mapIcon(iconName) {
  switch (iconName) {
    case "Bkash":
      return Bkash;
    case "Nagad":
      return Nagad;
    default:
      return Rocket;
  }
}

export default PaymentOptions;
