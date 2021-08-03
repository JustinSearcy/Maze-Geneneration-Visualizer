import React from "react";
import './mazeStyle.css';

export class MazeVisualizer extends React.Component {
    constructor() {
        super();

        this.state = {
            maze: [],
        }
    }

    componentDidMount() {
        this.resetMaze();
    }

    resetMaze() {
        const maze = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                maze.push(Square);                 
            }
        }
        this.setState({maze});
    }

    render() {
        const {maze} = this.state;

        return (
            <>
                <header>
                    <button>Reset Maze</button>
                    <button>Depth-First Search</button>
                </header>

                {maze.map((value, idx) => (
                    <div className="square" key={idx}></div>
                ))}
            </>
        );
    }
}

class Square extends React.Component {
    render() {
        return (
            <div className="square"></div>
        )
    }
}

export default MazeVisualizer;