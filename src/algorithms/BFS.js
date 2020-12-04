export default function BFS(){
    var no_rows=21;
    var no_columns=31;
    const grids=Array.from(document.getElementsByClassName('grid'));
    var x,y;
    var found_start=false;
    var target=[]
    var found_target=false;
    var i=0;
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
    while(queue.length>0 && !found_target){
        if(x===target[0] && y===target[1]){found_target=true;continue;};
        temp=queue.pop();
        x=temp[0];
        y=temp[1];
        neighbours=get_neighbours(x,y,visited);
        neighbours.forEach(neighbour=>{
            queue.splice(0,0,neighbour);
            parent[neighbour[0]+','+neighbour[1]]=[x,y]
        });
        if(!grids[((y-1)*no_columns)+(x-1)].classList.contains('start')
            && !grids[((y-1)*no_columns)+(x-1)].classList.contains('target')){
            grids[((y-1)*no_columns)+(x-1)].classList.add('seen');
        };
    };
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