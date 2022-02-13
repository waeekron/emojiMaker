import Ledscreen from "./Ledscreen";
import Palet from "./Palet";
import Form from "./Form";
import { useState, useCallback, useEffect } from "react";
import { ref, set } from "firebase/database";

const Panel = ({ database }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerHeight,
    heigth: window.innerHeight,
  });

  const initCoordinates = useCallback(() => {
    const list = [];
    for (let i = 0; i < 8; i++) {
      list[i] = new Array(8);
    }

    let y = 0;
    for (let i = 0; i < 8; i++) {
      let x = 0;
      for (let j = 0; j < 8; j++) {
        list[i][j] = { xCoordinate: x, yCoordinate: y };
        x += dimensions.width / 2 / 8;
      }
      y += dimensions.heigth / 2 / 8;
    }
    //returns 1 dimensional array
    return [].concat(...list);
  }, [dimensions]);
  const [color, setColor] = useState("black");
  const init = () => {
    const list = [];
    for (let i = 0; i < 64; i++) {
      list[i] = {
        id: i,
        lit: false,
        color: color,
      };
    }
    return list;
  };
  const clearHandler = () => {
    setPanels(init);
    setCoordinates(initCoordinates);
  };
  const [panels, setPanels] = useState(init);
  const matchIndex = (x, y) => {
    const boundries = [];
    coordinates.forEach((coord) => {
      boundries.push({
        boundryX: coord.xCoordinate + dimensions.width / 2 / 8,
        boundryY: coord.yCoordinate + dimensions.heigth / 2 / 8,
      });
    });

    for (let i = 0; i < 64; i++) {
      const kohdalla = boundries[i];
      if (x < kohdalla.boundryX && y < kohdalla.boundryY) {
        return i;
      }
    }
  };
  const handleClick = (e) => {
    let index = matchIndex(
      e.clientX - offset.offsetX,
      e.clientY - offset.offsetY
    );
    if (index === null) return;
    panels.forEach((panel) => {
      if (panel.id === index) {
        panel.lit = !panel.lit;
        panel.color = color;
      }
    });
    setPanels(panels.concat());
  };

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });
  const [coordinates, setCoordinates] = useState(initCoordinates);
  const changeSize = useCallback(() => {
    setDimensions({ width: window.innerHeight, heigth: window.innerHeight });
    setCoordinates(initCoordinates);
  }, [initCoordinates]);

  useEffect(() => {
    window.addEventListener("resize", debounce(changeSize, 2000));

    setOffset({
      offsetX: document.getElementById("ledscreen").getBoundingClientRect()
        .left,
      offsetY: document.getElementById("ledscreen").getBoundingClientRect().top,
    });

    return () =>
      window.removeEventListener("resize", debounce(changeSize, 3000));
  }, [database, dimensions, initCoordinates, changeSize]);

  const colorHandler = (color) => {
    setColor(color);
  };

  const posttData = () => {
    const db = database;
    set(ref(db, "emojit/" + name), {
      name: name,
      panels: panels,
      date: new Date().toString(),
    });
    clearHandler();
  };

  const [name, setName] = useState("kissa");

  return (
    <div>
      <Ledscreen
        id="ledscreen"
        width={dimensions.width / 2}
        height={dimensions.heigth / 2}
        onClick={handleClick}
        panels={panels}
        coordinates={coordinates}
        color={color}
      />
      <div id="controls">
        <Palet id="palet" handlechange={colorHandler} />
        <Form
          handleName={setName}
          handleClear={clearHandler}
          handleSubmit={() => posttData(panels)}
        />
      </div>
    </div>
  );
};

export default Panel;
