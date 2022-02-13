import Ledscreen from './Ledscreen.js'


const Display = (props) => {

    //TODO: propsit on olio -> muuta listaksi ja anna ledscreenille
    console.log(Object.values(props.panels))

    return(
        <div>
            <li>
                <Ledscreen panels={Object.values(props.panels)} />
            </li>
        </div>
    )
}

export default Display