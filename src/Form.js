import React, { useEffect, useState } from "react";

const Form = ({ handleSubmit, handleClear, handleName }) => {
  const [state, setState] = useState(false);
  const [button, setButton] = useState(true);
  const [name, setName] = useState("");

  const handleclick = () => {
    setState(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    handleName(e.target.value);
    if (name > 3) {
      //props.handlename();
      setButton(false);
    }
  };

  useEffect(() => {
    setButton(name);
  }, [button, name]);

  if (state) {
    return (
      <div>
        <form>
          <label htmlFor="">Name: </label>
          <input onChange={handleChange} value={name} type="text" />
          <button
            onClick={() => {
              setState(false);
            }}
          >
            cancel
          </button>
          <button disabled={!button} onClick={handleSubmit}>
            submit
          </button>
        </form>
      </div>
    );
  }
  return (
    <div id="buttons">
      <button onClick={handleClear}>clear</button>
      <button onClick={handleclick}>Save</button>
    </div>
  );
};

export default Form;
