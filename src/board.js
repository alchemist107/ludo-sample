import React, { Component } from "react";
import Tile from "./tile";
import Empty from "./emptyTile";
import Pawn from "./pawn";
import { walkingTiles } from "./data";
export default class board extends Component {
  state = {
    cords: walkingTiles,
    position: [0, 7],
    path: [
      [0, 6],
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 5],
      [6, 4],
      [6, 3],
      [6, 2],
      [6, 1],
      [6, 0]
    ],
    target: 6
  };
  componentDidMount() {
    return window.addEventListener("keyup", this.handleMove);
  }
  componentWillUnmount() {
    return window.removeEventListener("keyup", this.handleMove);
  }

  mapNewPosition = newPosition => {
    let emptyBoard = [
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      [1, 1, 1, 1, 1, 1, "x", "x", "x", 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, "x", "x", "x", 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, "x", "x", "x", 1, 1, 1, 1, 1, 1],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"],
      ["x", "x", "x", "x", "x", "x", 6, 7, 8, "x", "x", "x", "x", "x", "x"]
    ];
    emptyBoard[newPosition[0]][newPosition[1]] = 0;

    this.setState({
      cords: emptyBoard
    });
  };

  dice = () => {
    this.setState(
      {
        target: parseInt(Math.random(this.state.path.length - 1) * 10)
      },
      () => this.trip()
    );
  };

  trip = e => {
    const { path, target } = this.state;

    let index = 0;
    let timer;
    console.log(path[index]);
    timer = setInterval(() => {
      if (index <= target) {
        this.mapNewPosition(path[index]);

        console.log(index);
        return index++;
      }
      return clearInterval(timer);
    }, 1000);
  };

  handleMove = e => {
    const { position } = this.state;
    console.log("blalbllallblzl 39 37", e.keyCode);

    if (e.keyCode === 39) {
      if (position[1] <= 3) {
        position[1]++;
        return this.mapNewPosition(position);
      }
      return false;
    }
    if (e.keyCode === 37) {
      if (position[1] >= 0) {
        position[1]--;
        return this.mapNewPosition(position);
      }
      return false;
    }

    if (e.keyCode === 38) {
      if (position[0] >= 0) {
        position[0]--;
        return this.mapNewPosition(position);
      }
      return false;
    }

    if (e.keyCode === 40) {
      if (position[0] <= 7) {
        position[0]++;
        return this.mapNewPosition(position);
      }
      return false;
    }
    return true;
  };

  render() {
    const { cords } = this.state;
    return (
      <div className="board">
        {cords.map(el => (
          <div className="horizontal-line">
            {el.map(tile => {
              if (tile === 0) {
                return <Pawn />;
              } else if (tile === "x") {
                return <Empty />;
              } else {
                return <Tile />;
              }
            })}
          </div>
        ))}
        <div className="console">
          <span onClick={() => this.dice()} className="trip">
            Trip
          </span>
          <span>{this.state.target}</span>
        </div>
      </div>
    );
  }
}
