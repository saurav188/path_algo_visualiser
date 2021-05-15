import choose_algorithm from  "../user mannual  images/choose_algorithm.PNG"
import "../css/user_manual.css"
//algorithm selection detail

export default function Select_algorithm(){
    return (
        <div className="user_manual_container">
            <h3>Select Algorithm</h3>
            <ul className="texts">
                <li>Click on algorithm dropdown menu and choose an algorithm.</li>
            </ul>
            <img src={choose_algorithm}></img>
        </div>
    );
};