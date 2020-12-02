import Maze from './components/maze.js'
import Maze_control from './components/maze_controls.js'
import './css/index.css'

function App() {
    return (
        <div className="App">
          <Maze_control />
          <Maze />
        </div>
    );
}

export default App;