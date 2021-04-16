export default function dijsktra(no_rows,no_columns){
    const grids=Array.from(document.getElementsByClassName('grid'));
    let x,y;
    var found_start=false;
    let target=[]
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
    function get_neighbours(x,y){
        var neighbours=[];
        var index=((y-1)*no_columns)+(x-1);
        //top neighbour
        if(y-1>0 && !grids[index-no_columns].classList.contains('obstacle')){
            neighbours.push([x,(y-1)]);
        };
        //right neighbour
        if(x+1<=no_columns && !grids[index+1].classList.contains('obstacle')){
            neighbours.push([(x+1),y]);
        };
        //bottom neighbour
        if(y+1<=no_rows && !grids[index+no_columns].classList.contains('obstacle')){
            neighbours.push([x,(y+1)]);
        };
        //left neighbour
        if(x-1>0 && !grids[index-1].classList.contains('obstacle')){
            neighbours.push([(x-1),y]);
        };
        return neighbours;
    };
    var j=1;
    var k=1;
    var active_grids=[]
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
    active_grids.forEach(each=>{
        dist[each[0]+','+each[1]]=999999;
    });
    dist[x+','+y]=0;
    var start=[x,y]
    var parent={};
    let neighbours,min
    let current,z,temp;
    var keep_looping=true;
    var intervalId=null;
    intervalId=setInterval(()=>{
        if(document.getElementById("maze_control_varaible_continue_searching").innerHTML=="false"){
            clearInterval(intervalId);
            return;
        };
        if(active_grids.length<=0 || !keep_looping){clearInterval(intervalId);}
        min=99999;
        for(var i=0;i<active_grids.length;i++){
            temp=dist[active_grids[i][0]+','+active_grids[i][1]]
            if(min>temp){
                min=temp;
                z=i;
            };
        };
        current=active_grids[z];
        active_grids.splice(z,1);
        neighbours=get_neighbours(current[0],current[1]);
        neighbours.forEach(neighbour=>{
            if(dist[current[0]+','+current[1]]+1<dist[neighbour[0]+','+neighbour[1]]){
                dist[neighbour[0]+','+neighbour[1]]=dist[current[0]+','+current[1]]+1;
                parent[neighbour[0]+','+neighbour[1]]=[current[0],current[1]]
            };
            if(neighbour[0]===target[0] && neighbour[1]===target[1]){
                x=neighbour[0];
                y=neighbour[1];
                keep_looping=false
            };
            if(!grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('start')
                && !grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('target')){
                    grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.add('seen');
                    grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].innerHTML=dist[neighbour[0]+","+neighbour[1]]
            };
        })
        if(!keep_looping){
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
    }, 25);
};
