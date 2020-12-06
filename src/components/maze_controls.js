import '../css/maze_control.css'
import A_star from '../algorithms/A_star'
import BFS from '../algorithms/BFS'
import dijkstra from '../algorithms/dijskra'

function Maze_control(){
    var no_rows=21;
    var no_columns=31;
    function choose_eraser(){
        document.getElementById('eraser').checked = true;
        document.getElementById('drawer').checked = false;
        document.getElementById('start').checked = false;
        document.getElementById('target').checked = false;
    };
    function choose_drawer(){
        document.getElementById('eraser').checked = false;
        document.getElementById('drawer').checked = true;
        document.getElementById('start').checked = false;
        document.getElementById('target').checked = false;
    };
    function choose_start(){
        document.getElementById('start').checked = true;
        document.getElementById('target').checked = false;
        document.getElementById('eraser').checked = false;
        document.getElementById('drawer').checked = false;
    };
    function choose_target(){
        document.getElementById('start').checked = false;
        document.getElementById('target').checked = true;
        document.getElementById('eraser').checked = false;
        document.getElementById('drawer').checked = false;
    };
    function getRandomInt(min, max) {
        if(min===max){return min}
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function get_next(current,visited){
        var neighbours=[];
        var x=current[0]
        var y=current[1]
        visited[`${x},${y}`]=true;
        //top neighbour
        if(y>=3 && visited[`${x},${y-2}`]===undefined){
            neighbours.push([x,(y-2)])
        };
        //right neighbour
        if(x<=(no_columns-2) && visited[`${x+2},${y}`]===undefined){
            neighbours.push([(x+2),y])
        };
        //bottom neighbour
        if(y<=(no_rows-2) && visited[`${x},${y+2}`]===undefined){
            neighbours.push([x,(y+2)])
        };
        //left neighbour
        if(x>=3 && visited[`${x-2},${y}`]===undefined){
            neighbours.push([(x-2),y])
        };
        var no_neighbours=neighbours.length;
        if(no_neighbours===0){
            return 0;
        };
        var result=neighbours[getRandomInt(1,no_neighbours)-1]
        return result
    };
    function maze_generator(e){
        const grids=Array.from(document.getElementsByClassName('grid'));
        refresh();
        for(var i=0;i<grids.length;i++){
            var y=Math.floor(i/no_columns)+1;
            var x=(i%no_columns)+1;
            if(x%2===0 || y%2===0){
                grids[i].classList.add('obstacle');
            };
        };
        var stack=[[1,1]];
        var visited={}
        var current=[1,1]
        while(stack.length>0){
            var next=get_next(current,visited);
            if(next===0){current=stack.pop();continue};
            var index=(((current[1]-1)*no_columns)+(current[0]-1))
            //if current and next is in same row
            if(current[1]===next[1]){
                //left side
                if(current[0]>next[0]){
                        grids[index-1].classList.remove('obstacle');
                }
                //right side
                else if(current[0]<next[0]){
                    grids[index+1].classList.remove('obstacle');
                };
            }
            //if current and next is in same column
            else if(current[0]===next[0]){
                //top
                if(current[1]>next[1]){
                    grids[index-no_columns].classList.remove('obstacle');
                }
                //bottom
                else if(current[1]<next[1]){
                    grids[index+no_columns].classList.remove('obstacle')
                };
            };
            setTimeout(500)
            stack.push(next);
            current=next;
        };
    };
    function refresh(){
        const grids=Array.from(document.getElementsByClassName('grid'));
        grids.forEach(each=>{
            if(each.classList.contains('obstacle')){
                each.classList.remove('obstacle');
            };
            if(each.classList.contains('seen')){
                each.classList.remove('seen');
            };
            if(each.classList.contains('path')){
                each.classList.remove('path');
            };
            if(each.classList.contains('start')){
                each.classList.remove('start');
            };
            if(each.classList.contains('target')){
                each.classList.remove('target');
            };
        });
    };
    function find_path(){
        var algo=document.getElementById('algorithm').value;
        if(algo=='A* algorithm'){A_star();return}
        if(algo=='BFS'){BFS();return}
        if(algo=='dijkstra'){dijkstra();return}
    };
    return (
        <div className="maze_control">
            <button onClick={()=>refresh()}>refresh the maze</button><br></br>
            <h4 className="maze-building-title">Algorithm</h4>
            <select id='algorithm'>
                <option value='A* algorithm'>A* algorithm</option>
                <option value='BFS'>BFS</option>
                <option value='dijkstra'>dijkstra</option>
            </select>
            <br></br>
            <div className="algo-btns">
                <input type="checkbox" id="start" class="checkbox" onClick={choose_start}></input>
                <lable for="eraser"> start</lable><br></br>
                <input type="checkbox" id="target" class="checkbox" onClick={choose_target}></input>
                <lable for="drawer"> target</lable><br></br>
                <button id ="find-path-btn" onClick={()=>find_path()}>Find path</button>
            </div>
            <h4 className="maze-building-title">Maze building tools</h4>
            <hr></hr>
            <input type="checkbox" id="eraser" class="checkbox" onClick={choose_eraser}></input>
            <lable for="eraser">eraser</lable>
            <input type="checkbox" id="drawer" class="checkbox" onClick={choose_drawer}></input>
            <lable for="drawer">drawer</lable>
            <button class="btn generate-maze" onClick={e=>maze_generator(e)}>Generate maze</button>
        </div>
    )
};

export default Maze_control;

