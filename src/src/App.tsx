import React, { FC } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/layout/Dashboard";
import Landscape from "./BackgroundImage.png";

const App: FC = () => {
  return (
    <div
      className="App"
      style={{
        background: `url(${Landscape}) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <NavBar />
      <div className="container">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
