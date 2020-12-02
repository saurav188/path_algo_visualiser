import '../css/maze.css'

function Maze() {
    var no_rows=new Array(20).fill(true);
    var no_columns=new Array(30).fill(true);
    var i=1;
    return (
        <div className="maze">
           {no_rows.map(()=>
                no_columns.map(()=>
                <div className='grid'></div>
                )
            )}
        </div>
    );
};

export default Maze;
