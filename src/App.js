import Maze from './components/maze.js'
import Maze_control from './components/maze_controls.js'
import './css/index.css'

function App() {
    return (
        <div className="App">
          <div className="alert">
            <h1>Sorry,the app is not available in this screen size</h1>
          </div>
          <Maze_control />
          <Maze />
        </div>
    );
}

export default App;
