export default function genetic_algorithm(no_rows,no_columns){
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
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    };
    function dist(point1,point2){
        var result=(((point2[0]-point1[0])^2)+((point2[1]-point1[1])^2))^(1/2);
        if (result===0){
            return 1;
        }else{
            return result;
        };
    };
    function refresh(){
        const grids=Array.from(document.getElementsByClassName('grid'));
        grids.forEach(each=>{
            if(each.classList.contains('path')){
                each.classList.remove('path');
            };
        });
    };
    function display(max_fitness_path){
        refresh();
        max_fitness_path.forEach(each=>{
            if(!grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.contains('start') && 
                !grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.contains('target')){
                    grids[((each[1]-1)*no_columns)+(each[0]-1)].classList.add('path');
            };
        });
    }
    class path {
        constructor(start,target){
            var temp_path=[];
            var temp=start;
            var temp_visited={};
            while(temp[0]!=target[0] || temp[1]!=target[1]){
                var temp_neighbours=get_neighbours(temp[0],temp[1],temp_visited);
                if(temp_neighbours.length===0){break};
                var temp_next_index=getRndInteger(0,temp_neighbours.length);
                var temp_next=temp_neighbours[temp_next_index];
                temp_path.push(temp_next);
                temp=temp_next;
            };
            var temp_fitness=25000;
            if(temp[0]!==target[0] || temp[1]!==target[1]){temp_fitness=1000}
            temp_fitness=temp_fitness/(temp_path.length^2);
            this.path=temp_path;
            this.fitness=Math.abs(temp_fitness);
        };
    };
    function get_parent_according_to_prob(current_generation){
        var i=Math.random()
        var index=0
        while(i>0){
            i-=current_generation[index].prob;
            index++;
        };
        return current_generation[index-1]
    };
    function get_fitness(path,target){
        var temp_fitness=250000;
        var temp=path[path.length-1]
        if(temp[0]!==target[0] || temp[1]!==target[1]){temp_fitness=1000}
        temp_fitness=temp_fitness/(path.length^2);
        return Math.abs(temp_fitness);
    };
    function crossover(parent1,parent2,start,target){
        var parent1_visited={};
        var parent2_visited={};
        var i=0;
        var j=0;
        var resulting_path=[];
        var prev_i=0;
        var prev_j=0;
        var path1=parent1.path;
        var path2=parent2.path;
        var target_reached=false;
        while(i<path1.length && j<path2.length){
            parent1_visited[path1[i][0]+','+path1[i][1]]=i;
            parent2_visited[path2[j][0]+','+path2[j][1]]=j;
            if(parent1_visited[path2[j][0]+','+path2[j][1]]!==undefined){
                resulting_path=resulting_path.concat(path1.slice(prev_i,parent1_visited[path2[j][0]+','+path2[j][1]]+1));
                prev_i=parent1_visited[path2[j][0]+','+path2[j][1]]+1;
                parent1_visited[path2[j][0]+','+path2[j][1]]=undefined;
                prev_j=j+1;
                i=prev_i;
                j=prev_j;
                if(j<path2.length){
                    if(path2[j][0]===target[0] && path2[j][1]===target[1]){
                        target_reached=true;
                        break;
                    };
                };
            }
            else if(parent2_visited[path1[i][0]+','+path1[i][1]]!==undefined){
                resulting_path=resulting_path.concat(path2.slice(prev_j,parent2_visited[path1[i][0]+','+path1[i][1]]+1));
                prev_j=parent2_visited[path1[i][0]+','+path1[i][1]]+1;
                parent2_visited[path1[i][0]+','+path1[i][1]]=undefined;
                prev_i=i+1;
                i=prev_i;
                j=prev_j;
                if(i<path1.length){
                    if(path1[i][0]===target[0] && path1[i][1]===target[1]){
                        target_reached=true;
                        break;
                    };
                };
            }
            else if(path1[i][0]===target[0] && path1[i][1]===target[1]){
                resulting_path=resulting_path.concat(path1.slice(prev_i,i+1));
                target_reached=true;
                break;
            }
            else if(path2[j][0]===target[0] && path2[j][1]===target[1]){
                resulting_path=resulting_path.concat(path2.slice(prev_j,j+1));                
                target_reached=true;
                break;
            }
            else{
                i+=1;
                j+=1;
            };
        };
        if(!target_reached){
            if(i<path1.length){
                resulting_path=resulting_path.concat(path1.slice(i,path1.length))
            }else if(j<path2.length){
                resulting_path=resulting_path.concat(path2.slice(j,path2.length))
            };
        };
        var temp_child=new path(start,target)
        temp_child.path=resulting_path;
        temp_child.fitness=get_fitness(resulting_path,target);
        return temp_child
    };
    function crossover2(parent1,parent2,start,target){
        var parent1_visited={};
        var parent2_visited={};
        var i=0;
        var j=0;
        var resulting_path=[];
        var path1=parent1.path;
        var path2=parent2.path;
        var both_reaches_target,parent1_reaches_target,parent2_reaches_target;
        var crossover_complete=false;
        while(i<path1.length && j<path2.length){
            parent1_visited[path1[i][0]+','+path1[i][1]]=i;
            parent2_visited[path2[j][0]+','+path2[j][1]]=j;
            if(parent1_visited[path2[j][0]+','+path2[j][1]]!==undefined){
                resulting_path=resulting_path.concat(path1.slice(0,parent1_visited[path2[j][0]+','+path2[j][1]]+1));
                parent1_reaches_target=path1[path1.length-1][0]===target[0] && path1[path1.length-1][1]===target[1];
                parent2_reaches_target=path2[path2.length-1][0]===target[0] && path2[path2.length-1][1]===target[1];
                both_reaches_target=parent1_reaches_target && parent2_reaches_target;
                if(both_reaches_target){
                    if((path1.length-parent1_visited[path2[j][0]+','+path2[j][1]])<(path2.length-j)){
                        resulting_path=resulting_path.concat(path1.slice(parent1_visited[path2[j][0]+','+path2[j][1]]+1,path1.length))
                    }else{
                        resulting_path=resulting_path.concat(path2.slice(j+1,path2.length))
                    }
                }
                else if(parent1_reaches_target){
                    resulting_path=resulting_path.concat(path1.slice(parent1_visited[path2[j][0]+','+path2[j][1]]+1,path1.length))
                }
                else if(parent2_reaches_target){
                    resulting_path=resulting_path.concat(path2.slice(j+1,path2.length))
                }
                else{
                    resulting_path=resulting_path.concat(path2.slice(j+1,path2.length))
                };
                crossover_complete=true;
                break;
            }
            else if(parent2_visited[path1[i][0]+','+path1[i][1]]!==undefined){
                resulting_path=resulting_path.concat(path2.slice(0,parent2_visited[path1[i][0]+','+path1[i][1]]+1));
                parent1_reaches_target=path1[path1.length-1][0]===target[0] && path1[path1.length-1][1]===target[1];
                parent2_reaches_target=path2[path2.length-1][0]===target[0] && path2[path2.length-1][1]===target[1];
                both_reaches_target=parent1_reaches_target && parent2_reaches_target;
                if(both_reaches_target){
                    if((path2.length-parent2_visited[path1[i][0]+','+path1[i][1]])<(path1.length-i)){
                        resulting_path=resulting_path.concat(path2.slice(parent2_visited[path1[i][0]+','+path1[i][1]]+1,path2.length))
                    }else{
                        resulting_path=resulting_path.concat(path1.slice(i+1,path1.length))
                    }
                }
                else if(parent2_reaches_target){
                    resulting_path=resulting_path.concat(path2.slice(parent2_visited[path1[i][0]+','+path1[i][1]]+1,path2.length))
                }
                else if(parent1_reaches_target){
                    resulting_path=resulting_path.concat(path1.slice(i+1,path1.length))
                }
                else{
                    resulting_path=resulting_path.concat(path1.slice(i+1,path1.length))
                };
                crossover_complete=true;
                break;
            }
            else if(path1[i][0]===target[0] && path1[i][1]===target[1]){
                resulting_path=resulting_path.concat(path1.slice(0,i+1));
                crossover_complete=true;
                break;
            }
            else if(path2[j][0]===target[0] && path2[j][1]===target[1]){
                resulting_path=resulting_path.concat(path2.slice(0,j+1));
                crossover_complete=true;
                break;
            }
            else{
                i+=1;
                j+=1;
            };
        };
        if(!crossover_complete){
            resulting_path=path1;
        }
        var temp_child=new path(start,target)
        temp_child.path=resulting_path;
        temp_child.fitness=get_fitness(resulting_path,target)
        return temp_child
    };
    function mutate(child,mutation_rate,start,target){
        var random_no=Math.random();
        if((random_no*100)-mutation_rate<0){
            var temp_child=new path(start,target)
            var temp_path=child.path
            var random_index=getRndInteger(0,temp_path.length);
            var temp_path=temp_path.slice(0,random_index);
            var temp=child.path[random_index];
            var temp_visited={};
            var keep_original=false;
            var target_reacher=child.path[child.path.length-1][0]===target[0] && child.path[child.path.length-1][1]===target[1];
            if(target_reacher){
                var random_index_two_steps_from_target=random_index+2<child.path.length;
                if(random_index_two_steps_from_target){
                    random_index=getRndInteger(random_index+1,child.path.length);
                }else{
                    random_index=child.path.length-1;
                }
                var temp_target=child.path[random_index];
            }else{
                var temp_target=target;
            }
            temp_path.forEach(each=>{
                temp_visited[(each[0]+1)+','+each[1]]=true;
            });
            while(temp[0]!=temp_target[0] || temp[1]!=temp_target[1]){
                temp_path.push(temp);
                var temp_neighbours=get_neighbours(temp[0],temp[1],temp_visited);
                if(temp_neighbours.length===0){
                    keep_original=true;
                    break
                };
                var temp_next_index=getRndInteger(0,temp_neighbours.length);
                var temp_next=temp_neighbours[temp_next_index];
                temp=temp_next;
            };
            temp_path.push(temp);
            if(target_reacher){
                temp_path=temp_path.concat(child.path.slice(random_index,child.path.length))
            };
            if(keep_original){
                temp_path=child.path;
            };
            var temp_child=new path(start, target)
            temp_child.path=temp_path;
            temp_child.fitness=get_fitness(temp_path,target)
            return temp_child
        };
        return child;
    };
    var start=[x,y]
    var population=document.getElementById("genetic_algo_population").value;
    var mutation_rate=document.getElementById("genetic_algo_mutation_rate").value;
    if(population=="" || mutation_rate==""){alert('Enter population and mutation rate');return}
    var current_generation=[];
    for(var i=0;i<population;i++){
        current_generation.push(new path(start,target));
    };
    var genetic_algorithm_interval=setInterval(() => {
        if(document.getElementById("maze_control_varaible_continue_searching").innerHTML=="false"){
            clearInterval(genetic_algorithm_interval);
            refresh();
            return;
        };
        var total_fitness=0;
        var max_fitness=0;
        var max_fitness_index;
        for(var i=0;i<current_generation.length;i++){
            if(current_generation[i].fitness>max_fitness){
                max_fitness=current_generation[i].fitness;
                max_fitness_index=i;
            };
            total_fitness+=current_generation[i].fitness;
        };
        var max_fitness_path=current_generation[max_fitness_index].path;
        current_generation.forEach(each=>{
            each.prob=each.fitness/total_fitness;
        });
        if(max_fitness==Infinity){
            genetic_algorithm(no_rows,no_columns);
            return;
        };
        display(max_fitness_path);
        var temp_generation=[]
        for(var i=0;i<population;i++){
            var parent1=get_parent_according_to_prob(current_generation);
            var parent2=get_parent_according_to_prob(current_generation);
            var temp=crossover2(parent1,parent2,start,target);
            var temp=mutate(temp,mutation_rate,start,target);
            temp_generation.push(temp);
        };
        current_generation=temp_generation;
    },10)
};
