import React, { useState }from "react";
import "../styles/styles.css";

const SudokuInput = (props) => {
    const [numberValue, setNumberValue] = useState(props.number);
    const [inputColor, setInputColor] = useState(false)

    const handleChange = (event) => {
        const re = /\b[1-9]\b/;
        if(re.test(event.target.value)){
            if(props.handleChangeInput(event.target.value, props.xPosition, props.yPosition)){
                setInputColor(true)
                setTimeout(() => {
                    setInputColor(false)
                  }, "2000")
                setNumberValue(event.target.value)
            }
            else{
                setInputColor(false)
                setNumberValue(0)
            }  
        } else {
            setNumberValue(numberValue)
            setInputColor(false)
        }  
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace')
            setNumberValue(0)
    }

    return (
        <input 
            className={inputColor ? 'sudokuInput sudokuInputOk' : 'sudokuInput'} 
            type="text" 
            value={numberValue === 0 ? " " : numberValue} 
            onChange={handleChange} 
            disabled={props.number !== 0}
            onKeyDown={handleKeyDown}
        />
    )
}

export default SudokuInput;