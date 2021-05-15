import choose_more from  "../user mannual  images/mobile/choose_more.PNG"
import optioons_open from  "../user mannual  images/mobile/options_open.PNG"
import "../css/user_manual.css"
//more options detail

export default function More_options(){
    return (
        <div className="user_manual_container">
            <h3>More Options</h3>
            <ul className="texts">
                <li>Click on More see more options.</li>
                <li>Click on X close more options.</li>
            </ul>
            <img src={choose_more}></img>
            <img src={optioons_open}></img>
        </div>
    );
};