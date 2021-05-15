import GA_options from "../user_manual_components/GA_options.js"
import Maze_builder from "../user_manual_components/maze_builder.js"
import Maze_eraser from "../user_manual_components/maze_eraser.js"
import Maze_generator from "../user_manual_components/maze_generator.js"
import More_options from "../user_manual_components/more_options.js"
import Select_algorithm from "../user_manual_components/select_algorithm.js"
import Select_start from "../user_manual_components/select_start.js"
import Select_target from "../user_manual_components/select_target.js"
import Start_stop_algo from "../user_manual_components/start_stop_algo.js"
import '../css/user_manual.css'

/*
    component containing user manual
 */

export default function User_manual(){
    function show_mobile_manual(){
        if(window.innerWidth<=720){
            return <div className="no_show"><More_options id="manual_6" /></div>;
        }
        else{
            return;
        }
    }
    function next_clicked(){
        var all_manuals=document.getElementsByClassName("all_manuals")[0].children;
        var to_show_index;
        for(var i=0;i<all_manuals.length;i++){
            if(all_manuals[i].classList.contains("show")){
                to_show_index=i+1;
                all_manuals[i].classList.remove("show");
            };
        };
        if(to_show_index>all_manuals.length-1){skip();return;}
        all_manuals[to_show_index].classList.add("show");
    };
    function prev_clicked(){
        var all_manuals=document.getElementsByClassName("all_manuals")[0].children;
        var to_show_index;
        for(var i=0;i<all_manuals.length;i++){
            if(all_manuals[i].classList.contains("show")){
                to_show_index=i-1;
                all_manuals[i].classList.remove("show");
            };
        };
        if(to_show_index<0){to_show_index=0};
        all_manuals[to_show_index].classList.add("show");
    };
    function skip(){
        document.getElementsByClassName("user_manual_main_container")[0].classList.add("no_show");
    }
    return (
        <div className="user_manual_main_container">
            <button className="button prev" onClick={prev_clicked}>Prev</button>
            <button className="button next" onClick={next_clicked}>Next</button>
                <div className="all_manuals">
                    <div className="no_show show"><Select_start id="manual_1" /></div>
                    <div className="no_show"><Select_target id="manual_2" /></div>
                    <div className="no_show"><Maze_builder id="manual_3" /></div>
                    <div className="no_show"><Maze_eraser id="manual_4" /></div>
                    <div className="no_show"><Maze_generator id="manual_5" /></div>
                    {show_mobile_manual()}
                    <div className="no_show"><Select_algorithm id="manual_7" /></div>
                    <div className="no_show"><GA_options id="manual_8" /></div>
                    <div className="no_show"><Start_stop_algo id="manual_9" /></div>
                </div>
            <button className="button skip" onClick={skip}>Skip</button>
        </div>
    );
};