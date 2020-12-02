import '../css/maze_control.css'

function Maze_control(){
    function choose_eraser(event){
        document.getElementById('eraser').checked = true;
        document.getElementById('drawer').checked = false;
    };
    function choose_drawer(event){
        document.getElementById('eraser').checked = false;
        document.getElementById('drawer').checked = true;
    };
    return (
        <div className="maze_control">
            <h4 className="maze-building-title">Algorithm</h4>
            <select id='algorithm'>
                <option value='A* algorithm'>A* algorithm</option>
            </select>
            <h4 className="maze-building-title">Maze building tools</h4>
            <hr></hr>
            <input type="checkbox" id="eraser" class="checkbox" onClick={choose_eraser}></input>
            <lable for="eraser">eraser</lable>
            <input type="checkbox" id="drawer" class="checkbox" onClick={choose_drawer}></input>
            <lable for="drawer">drawer</lable>
            <button class="btn generate-maze" onClick={()=>alert('hi')}>Generate maze</button>
        </div>
    )
};

export default Maze_control;

