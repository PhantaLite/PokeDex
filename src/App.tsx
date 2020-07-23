import React, { FC } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import Landscape from "./BackgroundImage.png";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const App: FC = () => {
  return (
    <Router>
      <div
        className="App"
        style={{
          background: `url(${Landscape}) no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route
              exact
              path="/pokemon/:pokemonIndex"
              component={Pokemon}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
