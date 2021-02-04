import React from "react";
import logo from "../images/sf-logo.png";
import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Friends } from "./Friends";
import { About } from "./About";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3>Friends List App</h3>
    </header>
    <Router>
      <div>
        <nav>
          <NavLink className="menu" to="/friend-list/friends">
            Friends
          </NavLink>
          <NavLink className="menu" to="/friend-list/about">
            About
          </NavLink>
        </nav>
        <main>
          <Route exact path="/friend-list/" component={Friends} />
          <Route path="/friend-list/friends" component={Friends} />
          <Route path="/friend-list/about" component={About} />
        </main>
      </div>
    </Router>
    <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
  </div>
);

export default App;
