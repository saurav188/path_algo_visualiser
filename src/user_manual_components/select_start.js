import choose_start from  "../user mannual  images/choose_start.PNG"
import  build_start from "../user mannual  images/build_start.PNG"
import "../css/user_manual.css"
//start selecting detail

export default function Select_start(){
    return (
        <div className="user_manual_container">
            <h3>Choose Start grid</h3>
            <ul className="texts">
                <li>Select start in options.</li>
                <li>Then choose the grid to be the start of the path.</li>
            </ul>
            <img src={choose_start}></img><br></br>
            <img src={build_start}></img>
        </div>
    );
};