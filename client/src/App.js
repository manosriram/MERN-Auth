import React from "react";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Status from "./Components/Status";
import Home from "./Components/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route exact path="/" component={Status} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
};

export default App;
