import React, { useState, useEffect } from "react";
import SudokuInput from "./SudokuInput";
import "../styles/styles.css";

const Sudoku = () => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        CreateMatrix();
    }, []);

    const CreateMatrix = () => {
        var array = []
        for(var i = 0; i < 9; i++){
            array.push([...new Array(9).fill(0)])
        }
        GenerateRandomNumbers(array)
        setArray(array)
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
         if(DuplicateRow(array,number, yPosition))
            return true;
         if(DuplicateColumn(array, number, xPosition))  
            return true;
         if(DuplicateBox(array, number, xPosition, yPosition, isFirst))
            return true;
        return false
    }

    const DuplicateRow = (array,number, yPosition) => {
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
        if(InvalidSudoku(array, parseInt(value), xPosition, yPosition, isFirst)){
            return false
        }
        else{
            array[xPosition][yPosition] = parseInt(value)
            setArray(array)
            return true
        }
            
    }

    return(
        <div className="sudoku">
            {array.map((x, xIndex)=> x.map((y, yIndex) => 
            <SudokuInput 
                key={xIndex + yIndex} 
                number={y} 
                xPosition={xIndex} 
                yPosition={yIndex} 
                handleChangeInput={handleChangeInput}/>
            ))}
        </div>
    )
}

export default Sudoku;