import React from 'react'

const Palet = (props) => {

    return(
        <div>
            <input
            id='colorInput' 
            onChange={props.handlechange}
            type='color' />
        </div>
    )

}

export default Palet