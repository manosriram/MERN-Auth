import Navbar from "./Navbar";
import "../Styles/Home.scss";
import Headers from "./Headers";
import React, { useEffect, useState } from "react";
const Cookie = require("js-cookie");

const Profile = props => {
  const [loginStat, setLoginStat] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch("/auth/userInfo", {
        method: "POST",
        headers: Headers.headers
      });
      const data = await response.json();
      setUserData(data);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    if (Cookie.get("auth_t") !== undefined) {
      setLoginStat(true);
      fetchUserData();
    } else {
      setMessage("Not Logged In");
    }
  }, []);

  if (loginStat) {
    return (
      <>
        <Navbar props={props} />
        <div className="userInfo">
          <h2>Username : {userData.username}</h2>
          <h2>Email : {userData.email}</h2>
          <h6 id="abt">About : {userData.description}</h6>
        </div>
      </>
    );
  } else {
    return (
      <div className="message">
        <h3>{message}</h3>
      </div>
    );
  }
};

export default Profile;
