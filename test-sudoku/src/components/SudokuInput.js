import React, { useState }from "react";
import "../styles/styles.css";

const SudokuInput = (props) => {
    const [numberValue, setNumberValue] = useState(props.number);
    const [inputColor, setInputColor] = useState('sudokuInput')

    const handleChange = (event) => {
        const re = /\b[1-9]\b/;
        if(re.test(event.target.value) && event.key !== 'Backspace'){
            if(props.handleChangeInput(event.target.value, props.xPosition, props.yPosition)){
                setInputColor('sudokuInputOk')
                setTimeout(() => {
                    setInputColor('sudokuInput')
                  }, "2000")
                setNumberValue(event.target.value)
            }
            else{
                setInputColor('sudokuInputNotOk')
                setTimeout(() => {
                    setInputColor('sudokuInput')
                  }, "2000")
                setNumberValue(0)
            }  
        } else if(event.target.value ===''){
            setNumberValue(0)
        }
        else {
            setNumberValue(numberValue)
            setInputColor('sudokuInputNotOk')
            setTimeout(() => {
                setInputColor('sudokuInput')
              }, "2000")
        } 
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace'){
            props.handleKey(props.xPosition, props.yPosition)
            setNumberValue(0)
        }
    }

    return (
        <input 
            className={inputColor} 
            type="text" 
            value={numberValue === 0 ? " " : numberValue} 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
        />
    )
}

export default SudokuInput;