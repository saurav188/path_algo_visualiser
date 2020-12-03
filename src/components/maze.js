import '../css/maze.css'
import React, { useState } from 'react';

function Maze() {
    var no_rows=21;
    var no_columns=31;
    var only_click=false;
    var rows=new Array(no_rows).fill(true);
    var columns=new Array(no_columns).fill(true);
    const [clicked,change_clicked]=useState(false);
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
    };
    return (
        <div className="maze">
           {rows.map(()=>
                columns.map(()=>
                    <div className='grid' 
                        onClick={event=>{change_clicked(!clicked);only_click=true;build_maze(event);}} 
                        onMouseOver={event=>{if(clicked){build_maze(event)}}}>
                    </div>
                )
            )}
        </div>
    );
};

export default Maze;
