import choose_eraser from  "../user mannual  images/choose_eraser.PNG"
import  eraser1 from "../user mannual  images/earser1.PNG"
import  eraser2 from "../user mannual  images/earser2.PNG"
import  eraser3 from "../user mannual  images/earser3.PNG"
import "../css/user_manual.css"
//maze eraser selection and erasing detail

export default function Maze_eraser(){
    return (
        <div className="user_manual_container">
            <h3>Erase Obstacles</h3>
            <ul className="texts">
                <li>Select eraser in options.</li>
                <li>Then click on the obstacle to erase.</li>
                <li>Then hover around to erase more obstacle.</li>
                <li>When done click again.</li>
            </ul>
            <img src={choose_eraser}></img>
            <img src={eraser1}></img>
            <img src={eraser2}></img>
            <img src={eraser3}></img>
        </div>
    );
};