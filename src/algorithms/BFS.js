export default function BFS(no_rows,no_columns){
    const grids=Array.from(document.getElementsByClassName('grid'));
    var x,y;
    var found_start=false;
    var target=[]
    var found_target=false;
    var i=0;
    //finds start and target grid
    grids.forEach(grid=>{
        if(grid.classList.contains('start')){
            y=Math.floor(i/no_columns)+1;
            x=(i%no_columns)+1;
            found_start=true;
        }else if(grid.classList.contains('target')){
            target.push((i%no_columns)+1);
            target.push(Math.floor(i/no_columns)+1);
            found_target=true;
        };
        i++;
    });
    //checks if start and target grid is selected
    if(!found_start || !found_target){
        alert('choose target and start grid');
        return
    };
    //gets all the non active ,non visited neighbours
    function get_neighbours(x,y,visited){
        var neighbours=[];
        var index=((y-1)*no_columns)+(x-1);
        visited[x+','+y]=true;
        //top neighbour
        if(y-1>0 && !grids[index-no_columns].classList.contains('obstacle') && visited[x+','+(y-1)]===undefined){
            neighbours.push([x,(y-1)]);
            visited[x+','+(y-1)]=true;
        };
        //right neighbour
        if(x+1<=no_columns && !grids[index+1].classList.contains('obstacle') && visited[(x+1)+','+y]===undefined){
            neighbours.push([(x+1),y]);
            visited[(x+1)+','+y]=true;
        };
        //bottom neighbour
        if(y+1<=no_rows && !grids[index+no_columns].classList.contains('obstacle') && visited[x+','+(y+1)]===undefined){
            neighbours.push([x,(y+1)]);
            visited[x+','+(y+1)]=true;
        };
        //left neighbour
        if(x-1>0 && !grids[index-1].classList.contains('obstacle') && visited[(x-1)+','+y]===undefined){
            neighbours.push([(x-1),y]);
            visited[(x-1)+','+y]=true;
        };
        return neighbours;
    };
    var start=[x,y]
    found_target=false;
    var visited={};
    var parent={};
    var temp,neighbours;
    var queue=[[x,y]];
    var intervalId=null;
    intervalId=setInterval(()=>{
        if(document.getElementById("maze_control_varaible_continue_searching").innerHTML=="false"){
            //stop the algorithms when stop btn is clicked
            clearInterval(intervalId);
            return;
        };
        if(queue.length<=0 || found_target){clearInterval(intervalId);};
        if(x===target[0] && y===target[1]){found_target=true;};
        if(!found_target){//continue until target is found do this
            //dequeue from the queue
            temp=queue.pop();
            x=temp[0];
            y=temp[1];
            neighbours=get_neighbours(x,y,visited);
            //add nearest parent to the neighbour and add it to the queue
            neighbours.forEach(neighbour=>{
                queue.splice(0,0,neighbour);
                parent[neighbour[0]+','+neighbour[1]]=[x,y]
            });
            //show the grid as seen if the grid is not the start or the target
            if(!grids[((y-1)*no_columns)+(x-1)].classList.contains('start')
                && !grids[((y-1)*no_columns)+(x-1)].classList.contains('target')){
                grids[((y-1)*no_columns)+(x-1)].classList.add('seen');
            };
        }else{// do this if target is found
            while(!(x===start[0] && y===start[1])){
                if(!grids[((y-1)*no_columns)+(x-1)].classList.contains('start') && 
                    !grids[((y-1)*no_columns)+(x-1)].classList.contains('target')){
                        grids[((y-1)*no_columns)+(x-1)].classList.add('path');
                };
                temp=parent[x+','+y];
                x=temp[0];
                y=temp[1];
            };
        };
    },25);
};