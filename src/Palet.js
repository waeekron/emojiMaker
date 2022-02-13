import React from "react";

const Palet = ({ handlechange }) => {
  const handle = (e) => {
    handlechange(e.target.value);
  };
  return (
    <div className="palet">
      <span>
        <h5>Color:</h5>
      </span>
      <input id="colorInput" onChange={(e) => handle(e)} type="color" />
    </div>
  );
};

export default Palet;
