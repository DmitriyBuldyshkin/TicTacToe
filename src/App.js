import React, { useState, useEffect } from "react";
import Square from "./Square";

export default function App() {
  const [winner, setWinner] = useState(false);
  const [count, setCount] = useState(0);
  const [draw, setDraw] = useState(false);
  const [game, setGame] = useState(createNewBoard());
  function createNewBoard() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  useEffect(() => {
    const squares = [...game.squares];
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(true);
    }
    if (count === 9) {
      setDraw(true);
    }
  }, [game]);
  function startNewGame() {
    setWinner(false);
    setCount(0);
    setDraw(false);
    setGame(createNewBoard());
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function handleClick(index) {
    const squares = [...game.squares];
    if (winner || squares[index]) {
      return;
    }
    squares[index] = game.xIsNext ? "X" : "O";
    setGame((prevState) => ({
      ...prevState,
      squares: squares,
      xIsNext: !prevState.xIsNext,
    }));
    setCount(count + 1);
  }
  const gameElements = game.squares.map((square, index) => (
    <Square value={square} handleClick={() => handleClick(index)} />
  ));
  return (
    <div>
      <div className="game-container">{gameElements}</div>
      <h1 className="turn">
        {winner
          ? `Winner is : ${game.xIsNext ? "O" : "X"}`
          : draw
          ? "It's a Draw!"
          : `Next player : ${game.xIsNext ? "X" : "O"}`}
      </h1>
      {(winner || draw) && (
        <button onClick={startNewGame} className="new-game">
          Start new game
        </button>
      )}
    </div>
  );
}
