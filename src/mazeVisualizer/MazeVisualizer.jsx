import React from "react";
import './mazeStyle.css';
import Square from "./Square";
import * as mazeAlgorithms from "../mazeAlgorithms/mazeAlgorithms";
import Slider from 'react-input-slider';

export class MazeVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maze: [],
            x: 50,
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
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-visited-depth");
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-visited-prims");
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-visited-binary");
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-current-depth");
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-current-prims");
            document.getElementById(`square-${square.row}-${square.col}`).classList.remove("square-current-binary");
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
        const speed = this.state.x;
        mazeAlgorithms.depthFirstSearch(maze, speed);
    }

    randomizedPrims = () => {
        const maze = this.state.maze;
        const speed = this.state.x;
        mazeAlgorithms.randomizedPrims(maze, speed);
    }

    binaryTree = () => {
        const maze = this.state.maze;
        const speed = this.state.x;
        mazeAlgorithms.binaryTree(maze, speed);
    }

    stopMaze = () => {
        mazeAlgorithms.stopMaze();
    }

    render() {
        const {maze} = this.state;

        return (
            <>
                <header>
                    <button onClick={this.resetMaze}>Reset Maze</button>
                    <button onClick={this.stopMaze}>Stop Maze</button>
                    <button onClick={this.depthFirstSearch}>Depth-First Search</button>
                    <button onClick={this.randomizedPrims}>Randomized Prim's</button>
                    <button onClick={this.binaryTree}>Binary Tree</button>
                    <div>
                        <div className="slider-title">
                            Iteration Time
                        </div>
                        <div>
                            <Slider
                            axis="x"
                            x={this.state.x}
                            xmax="200"
                            onChange={({ x }) => this.setState({ x: x })}
                            styles={{
                                track: {
                                backgroundColor: 'white'
                                },
                                active: {
                                backgroundColor: 'dodgerblue'
                                },
                                thumb: {
                                width: 20,
                                height: 20
                                },
                                disabled: {
                                opacity: 0.5
                                }
                            }}></Slider>
                        </div>
                    </div>
                    
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
