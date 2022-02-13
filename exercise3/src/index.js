import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase,onValue, ref, child, get } from 'firebase/database'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBEhelWM29u3aI8fa8dNfktUtt6oiMtoSY",
  authDomain: "devaja-exercises.firebaseapp.com",
  databaseURL: "https://devaja-exercises-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "devaja-exercises",
  storageBucket: "devaja-exercises.appspot.com",
  messagingSenderId: "757442722367",
  appId: "1:757442722367:web:a922aa5fc7b96eaf98168a",
  measurementId: "G-PVH41SDJVY"

})

//const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(firebaseApp);

/*const starCountRef = ref(db, 'emojit/emoji')
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  }); 
  get(child(ref,'emojit' )).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
  ul>
        {props.data.map(emoji => 
          <li key={emoji.name}>
            {emoji}
          </li>
        )}
        </ul>
  
  */
  


ReactDOM.render(
  <React.StrictMode>
    <App 
    
    database={db} />
  </React.StrictMode>,
  document.getElementById('root')
);

