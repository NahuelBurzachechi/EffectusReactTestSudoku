import React from "react";
import "../styles/styles.css";

const SudokuOutPut = (props) => {
   
    return (
        <div>
            <p>{props.outPutText ? props.outPutText : "Welcome to the Sudoku World"}</p>
            <span>{Math.round(props.percentaje) + "%"}</span>
        </div>
    )
}

export default SudokuOutPut;