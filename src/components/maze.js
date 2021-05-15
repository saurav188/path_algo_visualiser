import '../css/maze.css'
import React, { useState,useEffect } from 'react';

//Component: maze
//
//includes:
//  onbstacles building function
//  actual maze

function Maze(props) {
    var maze_width=props.width;
    var maze_height=props.height;
    var no_rows=props.rows;
    var no_columns=props.columns;
    var only_click=false;
    var rows=new Array(no_rows).fill(true);
    var columns=new Array(no_columns).fill(true);
    const [clicked,change_clicked]=useState(false);
    function check_for_obstacle_in_target(){
        var target=Array.from(document.getElementsByClassName("target"))[0];
        target.classList.remove("obstacle");
    }
    //obstacle_building_function
    function build_maze(event){
        if(document.getElementById('drawer').checked === true){
            event.target.classList.add('obstacle')
        }else if(document.getElementById('eraser').checked === true){
            if(event.target.classList.contains('obstacle')){
                event.target.classList.remove('obstacle')
            };
        }else if(document.getElementById('start').checked === true && only_click==true){
            const grids=Array.from(document.getElementsByClassName('grid'));
            grids.forEach(each=>{
                if(each.classList.contains('start')){
                    each.classList.remove('start');
                };
            });
            event.target.classList.add('start');
        }else if(document.getElementById('target').checked === true && only_click==true){
            const grids=Array.from(document.getElementsByClassName('grid'));
            grids.forEach(each=>{
                if(each.classList.contains('target')){
                    each.classList.remove('target');
                };
            });
            event.target.classList.add('target');
        };
        only_click=false;
        check_for_obstacle_in_target();
    };
    //adding start and target grid at the beginning
    useEffect(()=>{
            const grids=Array.from(document.querySelectorAll(".grid"));
            grids[0].classList.add("start");
            grids[grids.length-1].classList.add("target");
    },[]);
    
    return (
        <div className="maze" style={{
            maxWidth:{maze_width}+"px",
            minWidth:{maze_width}+"px",
            maxHeight:{maze_height}+"px",
            minHeight:{maze_height}+"px"
        }}>
           {rows.map(()=>
                <div className="maze_row">
                    {columns.map(()=>
                        <div className='grid' 
                            onClick={event=>{change_clicked(!clicked);only_click=true;build_maze(event);}} 
                            onMouseOver={event=>{if(clicked){build_maze(event)}}}>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

export default Maze;
