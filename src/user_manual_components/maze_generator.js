import choose_generate_maze from  "../user mannual  images/choose_generate_maze.PNG"
import "../css/user_manual.css"
//maze generation detail

export default function Maze_generator(){
    return (
        <div className="user_manual_container">
            <h3>Auto Build Maze</h3>
            <ul className="texts">
                <li>Click on the generate maze button to automatically built a maze.</li>
            </ul>
            <img src={choose_generate_maze}></img>
        </div>
    );
};