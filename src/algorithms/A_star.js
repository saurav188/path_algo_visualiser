// A* path finding algorithm 

function A_star(no_rows,no_columns){
    const grids=Array.from(document.getElementsByClassName('grid'));
    var x,y;
    var found_start=false;
    var target=[]
    var found_target=false;
    var i=0;
    // find target and start cooridinates
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
    if(!found_start || !found_target){
        alert('choose target and start grid');
        return
    };
    //get all available neighbours of the given grid(x,y)
    function get_neighbours(x,y,visited){
        var neighbours=[];
        var index=((y-1)*no_columns)+(x-1)
        //top neighbour
        if(y-1>0 && !grids[index-no_columns].classList.contains('obstacle') && visited[x+','+(y-1)]===undefined){
            neighbours.push([x,(y-1)])
        };
        //right neighbour
        if(x+1<=no_columns && !grids[index+1].classList.contains('obstacle') && visited[(x+1)+','+y]===undefined){
            neighbours.push([(x+1),y])
        };
        //bottom neighbour
        if(y+1<=no_rows && !grids[index+no_columns].classList.contains('obstacle') && visited[x+','+(y+1)]===undefined){
            neighbours.push([x,(y+1)])
        };
        //left neighbour
        if(x-1>0 && !grids[index-1].classList.contains('obstacle') && visited[(x-1)+','+y]===undefined){
            neighbours.push([(x-1),y])
        };
        return neighbours;
    };
    // heuristic function for current
    function get_heuristic(current,target){
        return  dist[current[0]+','+current[1]]+(Math.abs(target[0]-current[0]))+(Math.abs(target[1]-current[1]));
    };
    found_target=false;
    var start=[x,y]
    var open=[[x,y]];
    var visited={};
    var j=1;
    var k=1;
    var active_grids=[];
    //puts all the active grid to the array gids
    grids.forEach(grid=>{
        if(!grid.classList.contains('obstacle')){
            active_grids.push([j,k]);
        };
        if(j===no_columns){
            k++;
            j=1;
        }else{
            j++;
        };
    });
    let dist={};
    let parent={}
    //dist from start of all the grids is infinity 
    active_grids.forEach(each=>{
        dist[each[0]+','+each[1]]=999999;
    });
    //dist of start from start is 0
    dist[x+','+y]=0;
    var neighbours,winner,current,temp;
    i=1;
    var intervalId=null;
    intervalId=setInterval(()=>{
        if(document.getElementById("maze_control_varaible_continue_searching").innerHTML=="false"){
            //stop the algorithm from running
            clearInterval(intervalId);
            return;
        };
        if(open.length<=0||found_target){clearInterval(intervalId);}
        if(!found_target){
            winner=0;
            // chooses a winner with the least heuristic
            for(var i=0;i<open.length;i++){
                if(get_heuristic(open[i],target)<get_heuristic(open[winner],target)){
                    winner=i;
                };
            };
            current=open[winner];
            //if cuurent is the target stop 
            if(current[0]===target[0] && current[1]==target[1]){
                found_target=true;
                x=current[0];
                y=current[1];
                return
            };
            //remove current from open array
            open.splice(winner,1);
            visited[current[0]+','+current[1]]=true;
            neighbours=get_neighbours(current[0],current[1],visited);
            neighbours.forEach(neighbour=>{
                //finds if neighbour is reached yet 
                if(dist[current[0]+','+current[1]]+1<dist[neighbour[0]+','+neighbour[1]]){//this distance < Infinity if not visited
                    //add nearest parent to neibour and new distance 
                    dist[neighbour[0]+','+neighbour[1]]=dist[current[0]+','+current[1]]+1;
                    parent[neighbour[0]+','+neighbour[1]]=[current[0],current[1]];
                    if(!(neighbour in open)){
                        //add neighbout to open if its not in it yet
                        open.push(neighbour)
                    };
                    //showt the grid as seen if the grid is not the start or the target
                    if(!grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('start')
                        && !grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('target')){
                            grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.add('seen');
                    };
                };
            });
        }else{
            //display the final path found
            while(!(x===start[0] && y===start[1])){
            if(!grids[((y-1)*no_columns)+(x-1)].classList.contains('start') && 
                !grids[((y-1)*no_columns)+(x-1)].classList.contains('target')){
                    grids[((y-1)*no_columns)+(x-1)].classList.add('path');
            };
            temp=parent[x+','+y];
            x=temp[0];
            y=temp[1];
        };
        }
    },25);
};

export default A_star;