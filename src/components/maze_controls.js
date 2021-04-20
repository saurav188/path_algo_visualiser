import '../css/maze_control.css'
import A_star from '../algorithms/A_star'
import BFS from '../algorithms/BFS'
import dijkstra from '../algorithms/dijskra'
import genetic_algorithm from '../algorithms/Genetic_algorithm'
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

function Maze_control(){
    var maze_width=window.innerWidth-10;
    var maze_height=(0.8*window.innerHeight)-10;
    var no_rows=Math.floor(maze_height/(25+(2*0.01)));
    var no_columns=Math.floor(maze_width/(25+(2*0.01)));
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
        var intervarId=setInterval(()=>{
            if(stack.length<=0){clearInterval(intervarId)}
            var next=get_next(current,visited);
            if(next===0){current=stack.pop();return};
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
            stack.push(next);
            current=next;
        },7.5);
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
            // if(each.classList.contains('start')){
            //     each.classList.remove('start');
            // };
            // if(each.classList.contains('target')){
            //     each.classList.remove('target');
            // };
        });
    };
    function stop_refresh(){
        set_countinue_serching(continue_seaching=="true"?continue_seaching="false":continue_seaching="true");
        const grids=Array.from(document.getElementsByClassName('grid'));
        grids.forEach(each=>{
            //if(each.classList.contains('obstacle')){
            //    each.classList.remove('obstacle');
            //};
            if(each.classList.contains('seen')){
                each.classList.remove('seen');
            };
            if(each.classList.contains('path')){
                each.classList.remove('path');
            };
            each.innerHTML="";
            //if(each.classList.contains('start')){
            //    each.classList.remove('start');
            //};
            //if(each.classList.contains('target')){
            //    each.classList.remove('target');
            //};
        });
    };
    var [continue_seaching,set_countinue_serching]=useState("false");
    function find_path(){
        set_countinue_serching(continue_seaching="true");
        var algo=document.getElementById('algorithm').value;
        if(algo=='Genetic Algorithm'){genetic_algorithm(no_rows,no_columns);return}
        if(algo=='A* algorithm'){A_star(no_rows,no_columns);return}
        if(algo=='BFS'){BFS(no_rows,no_columns);return}
        if(algo=='dijkstra'){dijkstra(no_rows,no_columns);return}
    };
    function show_more_options(){
        var algo_choosing_div=document.querySelector(".algo_choseing_div");
        var genetic_algo_options=document.querySelector(".genetic_algo_options");
        var show_btn=document.querySelector('#show_btn');
        if(show_btn.innerHTML=="X"){
            algo_choosing_div.classList.remove("show_more_options1");
            genetic_algo_options.classList.remove("show_more_options2");
            show_btn.innerHTML="More"
        }
        else{
            algo_choosing_div.classList.add("show_more_options1");
            genetic_algo_options.classList.add("show_more_options2");
            show_btn.innerHTML="X";
        };
        return
    }
    useEffect(()=>{
        document.getElementById("genetic_algo_population").value=100;
        document.getElementById("genetic_algo_mutation_rate").value=10;
    },[]);
    return (
        <div className="maze_control">
            <div class="maze_control_variables">
                <div id="maze_control_varaible_continue_searching">{continue_seaching}</div>
            </div>
            <button class="show-btn" onClick={()=>{show_more_options()}} id="show_btn">More</button>
            <button onClick={()=>stop_refresh()}> Stop </button><br></br>
            <div className="algo_choseing_div">
                <h4 className="maze-building-title">Algorithm:</h4>
                <select id='algorithm'>
                    <option value='Genetic Algorithm'>Genetic Algorithm</option>
                    <option value='A* algorithm'>A* algorithm</option>
                    <option value='BFS'>BFS</option>
                    <option value='dijkstra'>dijkstra</option>
                </select>
            </div>
            <br></br>
            <div className="genetic_algo_options">
                <label for="genetic_algo_population">Population: </label>
                <input id="genetic_algo_population" type="number" min="10"></input><br></br><br></br>
                <label for="genetic_algo_mutation_rate">Mutaion Rate: </label>
                <input id="genetic_algo_mutation_rate" type="number" min="0"></input><br></br>
            </div>
            <br></br>
            <div className="algo-btns">
                <input type="checkbox" id="start" class="checkbox" onClick={choose_start}></input>
                <lable for="eraser"> Start</lable><br></br>
                <input type="checkbox" id="target" class="checkbox" onClick={choose_target}></input>
                <lable for="drawer"> Target</lable><br></br>
                <button id ="find-path-btn" onClick={()=>find_path()}>Find path</button>
            </div>
            <div className="maze_building_options">
                <h4 className="maze-building-title">Maze building tools:</h4>
                <input type="checkbox" id="eraser" class="checkbox" onClick={choose_eraser}></input>
                <lable for="eraser"> Eraser</lable><br></br>
                <input type="checkbox" id="drawer" class="checkbox" onClick={choose_drawer}></input>
                <lable for="drawer"> Builder</lable><br></br>
                <button class="btn generate-maze" onClick={e=>maze_generator(e)}>Generate maze</button>
            </div>
        </div>
    )
};

export default Maze_control;

