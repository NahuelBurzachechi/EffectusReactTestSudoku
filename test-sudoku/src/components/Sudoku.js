import React, { useState } from "react";
import SudokuInput from "./SudokuInput";
import SudokuOutPut from "./SudokuOutPut";
import SudokuRules from "./SudokuRules";
import {InvalidSudoku} from "../functions/InvalidSudokuFunction";
import { GenerateRandomNumbers } from "../functions/GenerateRandomNumbersFunction";
import "../styles/styles.css";
import {firstScreenConstants, imagesUrl} from "../constants/Constants";

const Sudoku = () => {
    const [array, setArray] = useState();
    const [toPlay, setToPlay] = useState(false);
    const [percentajeCount, setPercentajeCount] = useState(0)
    const [outPutText, setOutPutText] = useState(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
    const [isLoading, setIsLoading] = useState(false)

    const CreateMatrix = () => {
        var array = []
        for(var i = 0; i < 9; i++){
            array.push([...new Array(9).fill(0)])
        }
        var newArrayWithNumbers = GenerateRandomNumbers(array)
        setArray([...newArrayWithNumbers])
        setToPlay(true)
    }

    const HandleChangeInput = (value, xPosition, yPosition) => {
        let isFirst = false
        let response = false
        if(InvalidSudoku(array, parseInt(value), xPosition, yPosition, isFirst)){
             array[xPosition][yPosition] = 0
            setOutPutText(firstScreenConstants.FAILMESSAGES[Math.round(Math.random() * 2)])
        }
        else{
            setOutPutText(firstScreenConstants.CORRECTMESSAGES[Math.round(Math.random() * 3)])
            response = true
            array[xPosition][yPosition] = parseInt(value)
        }
        setArray([...array])
        Percentaje()
        return response
    }

    const Percentaje = () => {
        var count = -27
        array.map(x => x.map(y => y !== 0 ? count++ : count += 0))
        let percentaje = (count * 100) / 54
        setPercentajeCount(percentaje)
    }

    const HandleResetButton = () => {
        setToPlay(false)
        setIsLoading(true)
        setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
        setTimeout(() => {
            CreateMatrix()
            setPercentajeCount(0)
            setIsLoading(false)
          }, "100")
    }

    const HandleExitButton = () => {
        setToPlay(false)
        setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
        setPercentajeCount(0)
    }

    const HandleKeyDown = (xPosition, yPosition) => {
            array[xPosition][yPosition] = 0
            setArray([...array])
            setOutPutText("It's okey, it's okey, you can try again")
            Percentaje()
    }
    return(
        <div>
            {Math.round(percentajeCount) === 100 ? <div>Congratulations!! You win!!</div> :
            !toPlay ? isLoading ? <span>Loading...</span> :
                <div className="first-screen-wrapper">
                    <img id="effectus-logo" src={imagesUrl.EFFECTUSLOGO} alt="Effectus Logo"/>
                    <button id='playButton' type="button" onClick={() => CreateMatrix()}>Play</button>
                    <SudokuRules rules={firstScreenConstants.RULES}/>
                </div> :
            <div>
                 <SudokuOutPut percentaje={percentajeCount} outPutText={outPutText}/>
                <div className="sudoku">
                    {array.map((x, xIndex)=> x.map((y, yIndex) => 
                        <SudokuInput 
                            key={xIndex + yIndex} 
                            number={y} 
                            xPosition={xIndex} 
                            yPosition={yIndex} 
                            HandleChangeInput={HandleChangeInput}
                            HandleKey={HandleKeyDown}
                        />
                    ))}
                </div>
                <button id='resetButton' type="button" onClick={() => HandleResetButton()}>Reset</button>
                <button id='exitButton' type="button" onClick={() => HandleExitButton()}>Exit</button>
            </div>}            
        </div>
    )
}

export default Sudoku;