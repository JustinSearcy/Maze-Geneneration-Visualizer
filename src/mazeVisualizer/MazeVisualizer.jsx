import React from "react";
import './mazeStyle.css';
import Square from "./Square";
import * as mazeAlgorithms from "../mazeAlgorithms/mazeAlgorithms";

export class MazeVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maze: [],
            current: null,
        }
    }

    componentDidMount() {
        this.resetMaze();
    }

    resetMaze = () => {
        const maze = [];
        for (let row = 0; row < 20; row++) {
            for(let col = 0; col < 40; col++){
                maze.push(this.createSquare(row, col));
            }
        }
        this.setState({maze: maze});
    }

    createSquare = (row, col) => {
        return(
            {
                row,
                col,
            }
        );
    }

    depthFirstSearch = () => {
        const maze = this.state.maze;
        mazeAlgorithms.depthFirstSearch(maze);
    }

    animate = () => {
        const maze = this.state.maze;
        for(let i = 0; i < maze.length; i++){
            setTimeout(() =>{
                const square = maze[i];
                // console.log(document.getElementById(`square-${square.row}-${square.col}`).className)
                console.log(square.className);
                 //= "square square-visited";
            }, 10 * i);
        }
    }

    render() {
        const {maze} = this.state;

        return (
            <>
                <header>
                    <button onClick={this.resetMaze}>Reset Maze</button>
                    <button onClick={this.depthFirstSearch}>Depth-First Search</button>
                    <button onClick={this.animate}>Test Animation</button>
                </header>

                <div className="maze-container">
                    {maze.map((square, idx) => (
                        <Square 
                            key={idx} 
                            row={square.row}
                            col={square.col}
                            ></Square>
                    ))}
                </div>
            </>
        );
    }
}
