import React from "react";
import "../styles/styles.css";

const SudokuOutPut = (props) => {
   
    return (
        <div className='sudokuOutput'>
            <p>{props.outPutText}</p>
            <span>{Math.round(props.percentage) + "%"}</span>
        </div>
    )
}

export default SudokuOutPut;