import React, { useState } from "react";
import SudokuInput from "./SudokuInput";
import SudokuOutPut from "./SudokuOutPut";
import SudokuRules from "./SudokuRules";
import "../styles/styles.css";

const correctMessages = ["You are the best, around...", 
                        "You are awesome", 
                        "Yes! that's right!", 
                        "Is it possible for you to fail?"]

const failMessages = ["Don't worry, you need to try again",
                      "Next time you'll do better",
                      "No one is born knowing everything"]

const rules = ["Sudoku grid consists of 9x9 spaces",
                       "You can use only numbers from 1 to 9",
                       "Each 3×3 block can only contain numbers from 1 to 9",
                       "Each vertical column can only contain numbers from 1 to 9",
                       "Each horizontal row can only contain numbers from 1 to 9",
                       "Each number in the 3×3 block, vertical column or horizontal row can be used only once",
                       "The game is over when the whole Sudoku grid is correctly filled with numbers"]

const Sudoku = () => {
    const [array, setArray] = useState();
    const [toPlay, setToPlay] = useState(false);
    const [percentajeCount, setPercentajeCount] = useState(0)
    const [outPutText, setOutPutText] = useState("Welcome to Sudoku Effectus")

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
                        array[xPosition][yPosition] = randomNumber
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
            if(rowArray.includes(number)){
                return true;
            } else {
                rowArray.push(array[x][yPosition]);
            }
        }
        return false
    }

    const DuplicateColumn = (array, number, xPosition) => {
        let columnArray = [];
        for (var y = 0; y < 9; y++){
            if(columnArray.includes(number)){
                return true;
            } else {
                columnArray.push(array[xPosition][y]);
            }
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
                if(arrayBoxNumbers.includes(number)){
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

    const handleChangeInput = (value, xPosition, yPosition) => {
        let isFirst = false
        let response = false
        if(InvalidSudoku(array, parseInt(value), xPosition, yPosition, isFirst)){
             array[xPosition][yPosition] = 0
            setOutPutText(failMessages[Math.round(Math.random() * 2)])
        }
        else{
            setOutPutText(correctMessages[Math.round(Math.random() * 3)])
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
        setTimeout(() => {
            CreateMatrix()
            setPercentajeCount(0)
          }, "100")
    }

    const HandleKeyDown = (xPosition, yPosition) => {
            array[xPosition][yPosition] = 0
            setArray([...array])
            setOutPutText("Its okey, it's okey, you can try again")
            Percentaje()
    }

    return(
        <div>
            {!toPlay ? 
                <div>
                    <button id='playButton' type="button" onClick={() => CreateMatrix()}>Play</button>
                    <SudokuRules rules={rules}/>
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
                            handleChangeInput={handleChangeInput}
                            handleKey={HandleKeyDown}
                        />
                    ))}
                </div>
                <button id='resetButton' type="button" onClick={() => HandleResetButton()}>Reset</button>
                <button id='exitButton' type="button" onClick={() => setToPlay(false)}>Exit</button>
            </div>}            
        </div>
    )
}

export default Sudoku;