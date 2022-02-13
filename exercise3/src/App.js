import React, {useState, useEffect} from 'react'
import Ledscreen from './Ledscreen.js'
import Form from './Form.js'
import Palet from './Palet.js'
import Display from './Display.js'
import {getDatabase, ref, set, onValue,child,get} from 'firebase/database'



function App(props) {

  const [color, setColor] = useState('black')
  const [name, setName] = useState('')
  const  [dimensions, setDimensions] = useState(
    {
    width:window.innerHeight,
    heigth: window.innerHeight
    })

    const init = () => {
      const list = []
      for (let i = 0; i < 64; i++) {
        list[i] =
          {
            id: i, 
            lit: false,
            color: color
          }
      }
      return list
    }
    
    const initCoordinates = () => {
      console.log(document.getElementById('panel'))
      const list = []
      for(let i = 0; i < 8; i++) {
        list[i] = new Array(8)
      }

      let y = 0
      for(let i = 0; i < 8; i++) {
        let x = 0
        for (let j = 0; j < 8; j++) {
          list[i][j] = {xCoordinate: x , yCoordinate: y}
          x += (dimensions.width/2)/8
        }
        y += (dimensions.heigth/2)/8        
      }
      //returns 1 dimensional array
      return [].concat(...list)
    }

  const [panels, setPanels] = useState(init)
  const [coordinates, setCoordinates] = useState(initCoordinates)
  

  const handleClick = (e) => {
    console.log(e.clientX,e.clientY)
    let index = matchIndex(e.clientX - offset.offsetX, e.clientY - offset.offsetY)
    console.log(index)
    if(index === null) return
    panels.forEach(panel => {
      if(panel.id === index) {
        panel.lit = !panel.lit
        panel.color = color
      }
    })
    setPanels(panels.concat())
  }

  const matchIndex = (x, y) => {
      const boundries = []
      coordinates.forEach(coord => {
        boundries.push({boundryX: coord.xCoordinate + (dimensions.width/2)/8, boundryY: coord.yCoordinate + (dimensions.width/2)/8})
      })
      for(let i=0; i < 64; i++) {
        const kohdalla = boundries[i]
        if(x < kohdalla.boundryX && y < kohdalla.boundryY ) {
          return i
        }
      }
  }
   
  const changeSize = () => {
    setDimensions({width:window.innerHeight, heigth: window.innerHeight})
    setCoordinates(initCoordinates)
  }

  const convert = (data) => {
    return 1
  }

  const[offset, setOffset] = useState({offsetX:0, offsetY:0})

  useEffect(() => {
    document.body.onresize = changeSize
    console.log(document.getElementById('panel').getBoundingClientRect())
    setOffset(
      {
        offsetX: document.getElementById('panel').getBoundingClientRect().left,
        offsetY: document.getElementById('panel').getBoundingClientRect().top
    }
      )
    /*get(child(props.database, 'emojit')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });*/
    const starCountRef = ref(props.database, 'emojit')
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(Object.values(data))
    setEmojis(Object.values(data))
  });
  },[])

  const [emojis, setEmojis] = useState([])
  
  const clearHandler = () => {
    setPanels(init)
    setCoordinates(initCoordinates)
  }

  const colorHandler = () => {
    setColor(document.getElementById('colorInput').value)
    console.log(document.getElementById('colorInput').value)
  }
  
  const checkInput = () => {
    console.log('tarkistetaan')
    console.log(name === '')
    if(name === '') {
      console.log('tyhjä')
      return false
    }
    return true
  }

  const postData = () => {

    let proceed = checkInput()
    console.log(proceed)
    /*if (proceed) {
      const db = props.database
      set(ref(db, 'emojit/' + name), {
        name:name,
        panels:panels,
        date: new Date().toString()
      })
      console.log('data send to database') 

      clearHandler()
    }*/
  }

  const nameListener = (e) => {
    setName(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div id="panel"> 
        
        <Ledscreen id="ledscreen"
        width={dimensions.width/2}
        height={dimensions.heigth/2}
        onClick={handleClick}
        panels={panels}
        coordinates={coordinates}
        color={color}
        />
        <div id="controls">
          <Palet 
          id='palet'
          handlechange={colorHandler}
          />
          <Form 
          handlename={nameListener}
          handleclear={clearHandler}
          handlesubmit={postData}
          />
        </div>
        <h2>Drawn emojis</h2>
        
        <ul>
        {emojis.map(emoji => 
          
           // <Display key={emoji.name} name={emoji.name} panels={emoji.panels}/>
          <li key={emoji.name}> 
          <Ledscreen
          width={dimensions.width/4}
          height={dimensions.heigth/4}
          panels={Object.values(emoji.panels)}
          /> <p>{emoji.name}</p></li>
        )}
        </ul>
    </div>
  );
}

export default App
