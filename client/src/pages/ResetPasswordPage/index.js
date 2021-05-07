import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import { KeyIcon } from "../../assets/assets.js";
import { Redirect } from "react-router";
import axios from "axios";
import { useLocation } from "react-router-dom";

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const ResetPassword = ({ isAuthenticated }) => {
  const [form, setFormContent] = useState({});
  const location = usePathname();

  function onResetClick(event) {
    event.preventDefault();
    setFormContent(form);
    console.log("RESET BUTTON CLICKED");
    console.log(form);
    form.location = location;

    const sendForm = async () => {
      const { data } = await axios.post("/api/auth/reset-password", form);
      if (data.status === 1) {
        console.log(data.message);
        window.location.replace(data.redirectUrl);
      } else {
        if (data.status === -2) {
          window.location.replace("/");
        }
        console.log(data.status);
        console.log(data.message);
      }
    };

    sendForm();
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevContent) => {
      if (name === "password") {
        return {
          password: value,
          confirmPassword: prevContent.confirmPassword,
        };
      } else if (name === "confirmPassword") {
        return {
          password: prevContent.password,
          confirmPassword: value,
        };
      }
    });
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>RESET PASSWORD</h1>

            <form>
              <div>
                <Input
                  name="password"
                  onChange={handleChange}
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Password"
                  className="input-length"
                />
              </div>
              <div>
                <Input
                  name="confirmPassword"
                  onChange={handleChange}
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Confirm Password"
                  className="input-length"
                />
              </div>
              <div>
                <button onClick={onResetClick} className=" btn btn-type1">
                  RESET
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
