import React, { useState } from "react";
import SudokuInput from "./SudokuInput";
import SudokuOutPut from "./SudokuOutPut";
import SudokuRules from "./SudokuRules";
import "../styles/styles.css";
import {firstScreenConstants} from "../constants/Constants";

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
        GenerateRandomNumbers(array)
        setArray([...array])
        setToPlay(true)
    }

    const GenerateRandomNumbers = (array) => {
        let isFirst = true
        let numbersCount = 0
        for (var x = 0; x < 9; x++){
            while (numbersCount < 3){
                let xPosition = Math.round(Math.random() * 8);
                let yPosition = Math.round(Math.random() * 8);
                let randomNumber = Math.round(Math.random() * 9);
                if(array[xPosition][yPosition] === 0){
                    if(InvalidSudoku(array, randomNumber, xPosition, yPosition, isFirst)){
                        array[xPosition][yPosition] = 0;
                        continue;
                    }else{
                        array[xPosition][yPosition] = randomNumber + "firstInput"
                        numbersCount++;
                    }
                }
            }
            numbersCount = 0
        }
    }

    const InvalidSudoku = (array, number , xPosition, yPosition, isFirst) => {
         if(DuplicateRow(array, number, yPosition))
            return true;
         if(DuplicateColumn(array, number, xPosition))  
            return true;
         if(DuplicateBox(array, number, xPosition, yPosition, isFirst))
            return true;
        return false
    }

    const DuplicateRow = (array, number, yPosition) => {
        let rowArray = [];  
        for (var x = 0; x < 9; x++){
            rowArray.push(array[x][yPosition]);
            if(rowArray.includes(number) || rowArray.includes(number + "firstInput"))
                return true;
        }
        return false
    }

    const DuplicateColumn = (array, number, xPosition) => {
        let columnArray = [];
        for (var y = 0; y < 9; y++){
            columnArray.push(array[xPosition][y]);
            if(columnArray.includes(number) || columnArray.includes(number + "firstInput"))
                return true;
        }
        return false
    }

    const DuplicateBox = (array, number, xPosition, yPosition, isFirst) => {
        let xPositionBox = Math.floor(xPosition / 3);
        let yPositionBox = Math.floor(yPosition / 3);
        let arrayBoxNumbers = [];
        let arrayBoxNumbersCount = 0
        for (var x = 0; x < 3; x++){
            for (var y = 0; y < 3; y++){
                let rowX = x + 3 * xPositionBox
                let columnY = y + 3 * yPositionBox
                if(arrayBoxNumbers.includes(number) || arrayBoxNumbers.includes(number + "firstInput")){
                    return true
                } else {
                    if (array[rowX][columnY] !== 0 && isFirst){
                        arrayBoxNumbersCount++
                    }
                    arrayBoxNumbers.push(array[rowX][columnY])
                } if (arrayBoxNumbersCount === 3){
                    return true
                }
            }
        }
        return false
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
            {!toPlay ? isLoading ? <span>Loading...</span> :
                <div className="first-screen-wrapper">
                    <img id="effectus-logo" src="https://media-exp1.licdn.com/dms/image/C4D0BAQHsFWDmHWY1mA/company-logo_200_200/0/1611338032428?e=1672272000&v=beta&t=SK7f6hKBznU6VPDrdLfFrSCO2gPviC5dSGhjdiQ_zRc" alt="Effectus Logo"/>
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