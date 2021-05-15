import choose_builder from  "../user mannual  images/choose_builder.PNG"
import  maze_build1 from "../user mannual  images/maze_build1.PNG"
import  maze_build2 from "../user mannual  images/maze_build2.PNG"
import "../css/user_manual.css"
//maze buuilder selecting and building detail

export default function Maze_builder(){
    return (
        <div className="user_manual_container">
            <h3>Build Obstacles</h3>
            <ul className="texts">
                <li>Select builder in options.</li>
                <li>Then click on the grid to be a obstacle.</li>
                <li>Then hover around to create more obstacle.</li>
                <li>When done click again.</li>
            </ul>
            <img src={choose_builder}></img>
            <img src={maze_build1}></img>
            <img src={maze_build2}></img>
        </div>
    );
};