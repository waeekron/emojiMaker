import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import Ledscreen from "./Ledscreen";

const List = ({ database, dimensions }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const starCountRef = ref(database, "emojit");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setEmojis(Object.values(data));
    });
  }, [database]);

  return (
    <div>
      <h2>Drawn Emojis</h2>

      {emojis.length > 0 ? (
        <ul>
          {emojis.map((emoji) => (
            <li key={emoji.name}>
              <Ledscreen
                width={dimensions.width / 4}
                height={dimensions.heigth / 4}
                panels={Object.values(emoji.panels)}
              />
              <p>{emoji.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div id="loader"></div>
      )}
    </div>
  );
};

export default List;
