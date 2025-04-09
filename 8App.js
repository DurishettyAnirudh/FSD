import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => setInput("");

  const calculate = () => {
    try {
      // ⚠️ In production, consider using a safer math parser (e.g., math.js)
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="calculator">
      <h2>React Calculator</h2>
      <input type="text" value={input} readOnly />

      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
            className={btn === "=" ? "equal" : ""}
          >
            {btn}
          </button>
        ))}
        <button className="clear" onClick={clearInput}>C</button>
      </div>
    </div>
  );
}

export default App;
