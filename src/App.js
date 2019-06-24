import React from "react";
import Board from "./board";
import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div> Game</div>
        <Board />
      </div>
    );
  }
}
