import React, { useState, useEffect } from "react";
import "../Styles/App.scss";
import { InputBox, StyledButton } from "../StyledComponents/Basic";
import { Link } from "react-router-dom";
import Headers from "./Headers";

const clearFields = () => {
  let element = document.querySelectorAll(InputBox);
  for (let t = 0; t < 4; t++) {
    element[t].value = "";
  }
};

const confirmChecks = ({ username, email, password, confirmPassword }) => {
  const regex = new RegExp("[a-zA-z0-9\\-.+]+@[a-zA-z0-0]+.com");
  if (password !== confirmPassword)
    return { success: false, errMessage: "Passwords Don't Match." };
  if (!username || !email || !password || !confirmPassword)
    return { success: false, errMessage: "All Fields Must be Filled." };
  if (username.length < 4)
    return {
      success: false,
      errMessage: "Username must be alteast 4 Characters long."
    };

  if (password.length < 4)
    return {
      success: false,
      errMessage: "Password must be atleast 4 Characters long."
    };

  if (!regex.exec(email)) {
    return { success: false, errMessage: "Not an Email." };
  }
  return { success: true };
};

const Register = props => {
  const [screenState, setScreenState] = useState("reg");
  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {}, []);

  const handleChange = e => {
    setErrMessage("");
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrMessage("");

    const userdata = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    };

    if (confirmChecks(userData).success) {
      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: Headers.headers,
          body: JSON.stringify(userdata)
        });
        const data = await response.json();
        clearFields();
        if (data.success === true) {
          props.history.push("/home");
        }
      } catch (er) {
        console.log(er);
      }
    } else {
      setErrMessage(confirmChecks(userData).errMessage);
    }
  };

  return (
    <>
      <div className="registerForm" onChange={handleChange}>
        <strong id="errMsg">{errMessage}</strong>
        <br />
        <br />

        <InputBox placeholder="Username" type="text" name="username" />
        <br />
        <br />
        <InputBox placeholder="Email Address" type="email" name="email" />
        <br />
        <br />
        <InputBox placeholder="Password" type="password" name="password" />
        <br />
        <br />
        <InputBox
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <br />
        <br />
        <StyledButton onClick={handleSubmit}>Register</StyledButton>
        <br />
        <br />
        <p>
          Already Registered?{"  "}
          <Link to="/login">
            <strong id="loginHover">Login.</strong>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
