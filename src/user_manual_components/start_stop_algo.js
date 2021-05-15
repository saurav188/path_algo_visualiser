import choose_start from  "../user mannual  images/choose_start.PNG"
import choose_stop from  "../user mannual  images/choose_stop.PNG"
import "../css/user_manual.css"
//details on starting and stoping algorithm

export default function Start_stop_algo(){
    return (
        <div className="user_manual_container">
            <h3>Start and Stop the algorithm.</h3>
            <ul className="texts">
                <li>Click on Find Path to run algorithm.</li>
                <li>Click on Stop to stop algorithm.</li>
                <li>***Always Stop the algorithm before starting another algorithm.***</li>
            </ul>
            <img src={choose_start}></img>
            <img src={choose_stop}></img>
        </div>
    );
};