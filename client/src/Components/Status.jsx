import { Redirect } from "react-router-dom";
import React, { useEffect } from "react";
const Cookie = require("js-cookie");

const Status = props => {
  const startEff = () => {
    if (Cookie.get("auth_t") === undefined) {
      props.history.push("/register");
    } else {
      props.history.push("/home");
    }
  };

  useEffect(() => {
    startEff();
  }, []);

  return (
    <>
      <h1>Status</h1>
    </>
  );
};

export default Status;
