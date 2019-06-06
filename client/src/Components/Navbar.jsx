import React, { useEffect, useState } from "react";
const Cookie = require("js-cookie");

const Navbar = () => {
  const [loginStat, setLoginStat] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (Cookie.get("auth_t") !== undefined) {
      setLoginStat(true);
      setUsername(Cookie.get("username"));
    }
  }, []);

  const logOut = () => {
    Cookie.remove("auth_t");
    window.location = "/register";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        HOME
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {loginStat === true && (
        <div className="collapse navbar-collapse" id="logout">
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active"
              href="#"
              onClick={() => (window.location = "/profile")}
            >
              <strong> {username}</strong>{" "}
              <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link active" href="#" onClick={logOut}>
              <strong> Logout</strong>{" "}
              <span className="sr-only">(current)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
