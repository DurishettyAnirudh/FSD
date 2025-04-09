import React, { useState } from "react";
import "./App.css";

function App() {
  const initialOptions = [
    { name: "Alice", votes: 0 },
    { name: "Bob", votes: 0 },
    { name: "Charlie", votes: 0 }
  ];

  const [options, setOptions] = useState(initialOptions);

  const vote = (index) => {
    const newOptions = [...options];
    newOptions[index].votes += 1;
    setOptions(newOptions);
  };

  const resetVotes = () => setOptions(initialOptions);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="voting-app">
      <h2>Voting App</h2>
      {options.map((opt, i) => (
        <div key={i} className="option">
          <button onClick={() => vote(i)}>{opt.name}</button>
          <span>
            {opt.votes} votes (
            {totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0}%)
          </span>
        </div>
      ))}
      <p>Total Votes: {totalVotes}</p>
      <button className="reset-btn" onClick={resetVotes}>Reset</button>
    </div>
  );
}

export default App;
