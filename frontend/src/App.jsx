import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <div className="">
      <Header />
      {/* <Home /> */}
      <Outlet />
    </div>
  );
};

export default App;
