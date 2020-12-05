function A_star(){
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
    function get_heuristic(current,target){
        return  dist[current[0]+','+current[1]]+(Math.abs(target[0]-current[0]))+(Math.abs(target[1]-current[1]));
    };
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
    found_target=false;
    var start=[x,y]
    var open=[[x,y]];
    var visited={};
    var j=1;
    var k=1;
    var active_grids=[];
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
    active_grids.forEach(each=>{
        dist[each[0]+','+each[1]]=999999;
    });
    dist[x+','+y]=0;
    var neighbours,winner,current,temp;
    i=1;
    var intervalId=null;
    intervalId=setInterval(()=>{
        if(open.length<=0||found_target){clearInterval(intervalId);}
        if(!found_target){
            winner=0;
            for(var i=0;i<open.length;i++){
                if(get_heuristic(open[i],target)<get_heuristic(open[winner],target)){
                    winner=i;
                };
            };
            current=open[winner];
            if(current[0]===target[0] && current[1]==target[1]){
                found_target=true;
                x=current[0];
                y=current[1];
                return
            };
            open.splice(winner,1);
            visited[current[0]+','+current[1]]=true;
            neighbours=get_neighbours(current[0],current[1],visited);
            neighbours.forEach(neighbour=>{
                if(dist[current[0]+','+current[1]]+1<dist[neighbour[0]+','+neighbour[1]]){
                    dist[neighbour[0]+','+neighbour[1]]=dist[current[0]+','+current[1]]+1;
                    parent[neighbour[0]+','+neighbour[1]]=[current[0],current[1]];
                    if(!(neighbour in open)){
                        open.push(neighbour)
                    };
                    if(!grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('start')
                        && !grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.contains('target')){
                            grids[((neighbour[1]-1)*no_columns)+(neighbour[0]-1)].classList.add('seen');
                    };
                };
            });
        }else{
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
    },100);
};

export default A_star;