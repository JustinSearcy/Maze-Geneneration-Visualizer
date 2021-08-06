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
        this.createMaze();
    }

    createMaze = () => {
        const maze = [];
        for (let row = 0; row < 20; row++) {
            for(let col = 0; col < 40; col++){
                maze.push(this.createSquare(row, col));
            }
        }
        this.setState({maze: maze});
    }

    resetMaze = () => {
        const maze = this.state.maze;
        for(let i = 0; i < maze.length; i++){
            const square = maze[i];
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-visited");
            document.getElementById(`square-${square.row}-${square.col}`).classList.add("wall-top");
            document.getElementById(`square-${square.row}-${square.col}`).classList.add("wall-bottom");
            document.getElementById(`square-${square.row}-${square.col}`).classList.add("wall-left");
            document.getElementById(`square-${square.row}-${square.col}`).classList.add("wall-right");
            square.isVisited = false;
        }
    }

    createSquare = (row, col) => {
        return(
            {
                row,
                col,
                isVisited: false,
            }
        );
    }

    depthFirstSearch = () => {
        const maze = this.state.maze;
        mazeAlgorithms.depthFirstSearch(maze);
    }

    randomizedPrims = () => {
        const maze = this.state.maze;
        mazeAlgorithms.randomizedPrims(maze);
    }

    render() {
        const {maze} = this.state;

        return (
            <>
                <header>
                    <button onClick={this.resetMaze}>Reset Maze</button>
                    <button onClick={this.depthFirstSearch}>Depth-First Search</button>
                    <button onClick={this.randomizedPrims}>Randomized Prim's</button>
                </header>

                <div className="maze-container">
                    {maze.map((square, idx) => (
                        <Square 
                            key={idx} 
                            row={square.row}
                            col={square.col}
                            isVisited={square.isVisited}
                            ></Square>
                    ))}
                </div>
            </>
        );
    }
}
