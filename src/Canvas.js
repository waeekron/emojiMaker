import React, {useRef,useEffect} from 'react';


function Canvas(props) {

    
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const offSetXRef = useRef(null);
    const offSetYRef = useRef(null);
    //const [current, draw] = useState(canvasRef);

    const paths = [];
    const corners = [];
    const litSquares = [];
    

  
    

    useEffect(() => {
        
        const canvas = canvasRef.current;
        
        offSetXRef.current = canvas.offsetLeft;
        offSetYRef.current = canvas.offsetTop;

        const ctx = canvas.getContext('2d');
        let counter = 0;

        for (let x = 0; x < 640; x += 80) {
            for (let y = 0; y < 640; y += 80) {
                let path = drawPath(x,y);
                ctx.stroke(path);
                paths[counter] = path;
                corners[counter] = { xCordinate: x + 80, 
                    yCordinate: y + 80};
            counter++;
            }
        }
        
        contextRef.current = ctx;
        
    })


    function drawPath(x, y) {

        let path = new Path2D();

        path.moveTo(x,y);
        path.lineTo(x + 80, y);
        path.lineTo(x + 80, y + 80);
        path.lineTo(x, y + 80);
        path.lineTo(x, y);
        
        return path;
    }

    const draw = (event) => {
        console.log(event.clientX + ', ' + event.clientY);

        let square = findSquare(event.clientX, event.clientY);

         if (litSquares.includes(square)) {
            contextRef.current.fillStyle = "white";
            contextRef.current.fill(paths[square]);
            contextRef.current.fillStyle = "black";
            contextRef.current.stroke(paths[square]);

            let index  = litSquares.indexOf(square);
            litSquares.splice(index,1);
            return;
        }
        contextRef.current.fillStyle = "black";
        contextRef.current.fill(paths[square]);
        litSquares.push(square);
        console.log(event.clientY)
    }

    function findSquare(x, y) {
        
        for ( let i = 0; i < corners.length; i++ ) {
            if (x - offSetXRef.current < corners[i].xCordinate && y - offSetYRef.current < corners[i].yCordinate) {
                return i;
            }
        }
        console.log(corners);
    }

    return (
        
            <canvas 
            onClick={draw} 
            ref={canvasRef} {...props} 
            width="640" height="640" 
            style={ {border: '1px solid black'} }>
            </canvas>
        
    );
}

export default Canvas;