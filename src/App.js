import Maze from './components/maze.js'
import Maze_control from './components/maze_controls.js'
import User_Mannual from './components/user_manual.js'
import './css/index.css'

function App() {
    var maze_width=window.innerWidth-25;
    var maze_height=(0.8*window.innerHeight)-25;
    var no_rows=Math.floor(maze_height/(25+(2*0.01)));
    var no_columns=Math.floor(maze_width/(25+(2*0.01)));
    document.title="Path algo visualizer";
    return (
        <div className="App">
          <Maze_control rows={no_rows} columns={no_columns} />
          <Maze width={maze_width} height={maze_height} rows={no_rows} columns={no_columns} />
          <User_Mannual />
        </div>
    );
}

export default App;
