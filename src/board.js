import React, { Component } from "react";
import Tile from "./tile";
import Pawn from "./pawn";
export default class board extends Component {
  state = {
    cords: [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    position: [0, 0],
    path: [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3]],
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
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
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
    return (
      <div className="board">
        {this.state.cords.map(el => (
          <div className="horizontal-line">
            {el.map(tile => {
              if (tile === 0) {
                return <Pawn />;
              }
              return <Tile />;
            })}
          </div>
        ))}
        <span onClick={() => this.dice()} className="trip">
          Trip
        </span>
      </div>
    );
  }
}
