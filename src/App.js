import React from "react";
import Panel from "./Panel.js";
import List from "./List";

function App({ database }) {
  const dimensions = {
    width: window.innerHeight,
    heigth: window.innerHeight,
  };

  return (
    <div id="panel">
      <h1>DRAW YOUR EMOJI</h1>
      <p>Design your emoji by clicking the squares</p>

      <Panel database={database} />
      <List database={database} dimensions={dimensions} />
    </div>
  );
}

export default App;
