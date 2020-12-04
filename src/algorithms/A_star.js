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
        return (Math.abs(target[0]-current[0]))+(Math.abs(target[1]-current[1]));
    };
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
    found_target=false;
    var path=[[x,y]];
    var visited={};
    var temp,temp_best,min_dist,neighbours;
    i=1;
    var intervalId=null;
    intervalId=setInterval(()=>{
        if(found_target){clearInterval(intervalId);}
        if(x===target[0] && y==target[1]){found_target=true;};
        if(!found_target){
            neighbours=get_neighbours(x,y,visited);
            if(neighbours.length==0){
                temp=path.pop();
                visited[x+','+y]=undefined; 
                x=temp[0];
                y=temp[1];
                return;
            };
            temp_best=[undefined,undefined];
            min_dist=Infinity;
            neighbours.forEach(each=>{
                temp=get_heuristic(each,target);
                if(temp<min_dist){
                    min_dist=temp;
                    temp_best=each;
                };
            });
            x=temp_best[0];
            y=temp_best[1];
            if(!grids[((y-1)*no_columns)+(x-1)].classList.contains('target')){
                grids[((y-1)*no_columns)+(x-1)].classList.add('seen');
            };
            visited[x+','+y]=true;
            path.push(temp_best);
        }else{
            path.forEach(each=>{
                    if(!grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.contains('start') && 
                        !grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.contains('target')){
                            grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.add('path')
                    };
            });
        }
    },200);
};

export default A_star;