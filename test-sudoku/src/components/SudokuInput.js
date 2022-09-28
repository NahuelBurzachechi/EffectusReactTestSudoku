import React, { useState }from "react";
import "../styles/styles.css";
import {secondScreenConstants} from "../constants/Constants";
 
const SudokuInput = (props) => {
    const [numberValue, setNumberValue] = useState(props.number);
    const [inputColor, setInputColor] = useState('sudokuInput')

    const HandleChange = (event) => {
        const re = /\b[1-9]\b/;
        if(re.test(event.target.value) && event.key !== 'Backspace'){
            if(props.HandleChangeInput(event.target.value, props.xPosition, props.yPosition)){
                ChangeInputColor(secondScreenConstants.SUDOKUINPUTCOLOROK)
                setNumberValue(event.target.value)
            }
            else{
                ChangeInputColor(secondScreenConstants.SUDOKUINPUTCOLORNOTOK)
                setNumberValue(0)
            }  
        } else if(event.target.value ===''){
            setNumberValue(0)
        }
        else {
            ChangeInputColor(secondScreenConstants.SUDOKUINPUTCOLORNOTOK)
            setNumberValue(numberValue)
        } 
    }

    const ChangeInputColor = (inputColor) => {
        setInputColor(inputColor)
        setTimeout(() => {
            setInputColor(secondScreenConstants.SUDOKUINPUTCOLORDEFAULT)
          }, "2000")
    }

    const HandleKeyDown = (event) => {
        if (event.key === 'Backspace'){
            props.handleKey(props.xPosition, props.yPosition)
            setNumberValue(0)
        }
    }

    return (
        <input 
            className={inputColor} 
            type="text" 
            value={numberValue === 0 ? " " : numberValue[1] === "f" ? numberValue[0] : numberValue}
            disabled={numberValue[1] === "f"}
            onChange={HandleChange} 
            onKeyDown={HandleKeyDown}
        />
    )
}

export default SudokuInput;