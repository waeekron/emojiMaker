import React, {useState} from 'react'

const Form = (props) => {

    const [state, setState] = useState(false)

    const handleclick = () => {
        setState(true)
    }

    if(state === true) {
       return(
           <div>
               <form action="">
                   <label htmlFor="">Name: </label>
                   <input onChange={props.handlename} type="text" />
                   <button onClick={() => {setState(false)}} >cancel</button>
                   <button onClick={props.handlesubmit} >submit</button>
               </form>
           </div>
       )
    }
    return(
        <div id="buttons">
            <button onClick={props.handleclear}>clear</button>
            <button onClick={handleclick}>Save</button>
        </div>
    )
}

export default Form