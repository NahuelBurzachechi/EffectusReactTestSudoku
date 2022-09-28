import React from "react";
import "../styles/styles.css";

const SudokuDialog = (props) => {
    return (
    <dialog className="sudokuDialog" open={props.openDialog}>
        <div>
            <p>{props.dialogText}</p>
            <button id='resetButton' type="button" onClick={() =>  props.handleDialogResponse(true, props.dialogText)}>Yes</button>
            <button id='exitButton' type="button" onClick={() =>  props.handleDialogResponse(false)}>No</button>
        </div>
    </dialog>
    )
}

export default SudokuDialog;