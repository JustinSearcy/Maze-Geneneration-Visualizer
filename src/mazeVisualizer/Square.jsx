import React from 'react'
import './mazeStyle.css';

export default class Square extends React.Component {
    render() {
        const {
            row,
            col,
        } = this.props;

        return (
            <div 
                id={`square-${row}-${col}`}
                className={`square`} ></div>
        )
    }
}
