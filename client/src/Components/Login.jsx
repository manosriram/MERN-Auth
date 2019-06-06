import React, { useState } from "react";
import { InputBox, StyledButton } from "../StyledComponents/Basic";
import "../Styles/App.scss";
import { Link } from "react-router-dom";
import Headers from "./Headers";

const clearFields = () => {
  let element = document.querySelectorAll(InputBox);
  for (let t = 0; t < 2; t++) {
    element[t].value = "";
  }
};

const confirmChecks = ({ email, password }) => {
  const regex = new RegExp("[a-zA-z0-9\\-.+]+@[a-zA-z0-0]+.com");

  if (!email || !password)
    return { success: false, errMessage: "Fill all the fields" };

  if (password.length < 4)
    return {
      success: false,
      errMessage: "Password must be of minimum length 4"
    };

  if (!regex.exec(email)) {
    return { success: false, errMessage: "Not an Email." };
  }

  return { success: true };
};

const Login = props => {
  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const userdata = {
      email: userData.email,
      password: userData.password
    };

    if (confirmChecks(userData).success) {
      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: Headers.headers,
          body: JSON.stringify(userdata)
        });
        const data = await response.json();
        if (data.success === true) {
          props.history.push("/home");
          window.location.reload();
        }
        clearFields();
      } catch (er) {
        console.log(er);
      }
    } else {
      setErrMessage(confirmChecks(userData).errMessage);
    }
  };

  return (
    <div className="loginForm" onChange={handleChange}>
      <InputBox placeholder="Email Address" type="email" name="email" />
      <br />
      <br />
      <InputBox placeholder="Password" type="password" name="password" />
      <br />
      <br />
      <StyledButton onClick={handleSubmit}>Login</StyledButton>
      <br />
      <br />
      <p>
        Not Registered?{"  "}
        <Link to="/">
          <strong id="loginHover">Register.</strong>
        </Link>
      </p>
    </div>
  );
};

export default Login;
