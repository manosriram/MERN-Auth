import React from "react";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Status from "./Components/Status";
import Home from "./Components/Home";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Status} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </BrowserRouter>
    </>
  );
};

export default App;
