import React, {useEffect, useRef} from 'react'


const Ledscreen = (props) => {

    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const sideW = props.width/8
        const sideH = props.height/8
        const panels = props.panels
        let y = 0
        let counter = 0
        for(let i = 0; i < 8; i++) {
            let x = 0
            for(let j = 0; j < 8; j++) {
                ctx.strokeRect(x,y,sideW,sideH)
                if(panels[counter] != null && panels[counter].lit === true) {
                    ctx.fillStyle= panels[counter].color
                    ctx.fillRect(x,y,sideW,sideH)
                }
                if(panels[counter] != null && panels[counter].lit === false) {
                    ctx.fillStyle='white'
                    ctx.fillRect(x,y,sideW,sideH)
                } 
                x += sideW 
                counter++
            }
            y += sideH
        }
    })


    return(
        
        <canvas 
        style={{border: '1px solid pink'}}
        ref={canvasRef} {... props}
        width={props.width}
        height={props.height}
        />
    )
}

export default Ledscreen