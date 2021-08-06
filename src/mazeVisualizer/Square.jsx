import React from 'react'
import './mazeStyle.css';

export default class Square extends React.Component {
    render() {
        const {
            row,
            col,
            isVisited,
        } = this.props;

        const extraClassName = isVisited ? "square-visited" : "";

        return (
            <div 
                id={`square-${row}-${col}`}
                className={`square wall-top wall-bottom wall-left wall-right ${extraClassName}`} ></div>
        )
    }
}
