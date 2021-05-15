import choose_target from  "../user mannual  images/Choose_target.PNG"
import  build_target from "../user mannual  images/build_target.PNG"
import "../css/user_manual.css"
//target selecting detail

export default function Select_target(){
    return (
        <div className="user_manual_container">
            <h3>Choose Target grid</h3>
            <ul className="texts">
                <li>Select target in options.</li>
                <li>Then choose the grid to be the target of the path.</li>
            </ul>
            <img src={choose_target}></img><br></br>
            <img src={build_target}></img>
        </div>
    );
};