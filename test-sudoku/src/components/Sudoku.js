import React, { useState, useEffect } from "react";

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
        let numbersCount = 0
        for (var x = 0; x < 9; x++){
            while (numbersCount < 3){
                let xPosition = Math.round(Math.random() * 8);
                let yPosition = Math.round(Math.random() * 8);
                let randomNumber = Math.round(Math.random() * 9);
                if(array[xPosition][yPosition] === 0){
                    if(InvalidSudoku(array, randomNumber, xPosition, yPosition)){
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

    const InvalidSudoku = (array,number ,xPosition, yPosition) => {
         if(DuplicateRow(array,number, yPosition))
            return true;
         if(DuplicateColumn(array, number, xPosition))  
            return true;
         if(DuplicateBox(array, number, xPosition, yPosition))
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

    const DuplicateBox = (array, number, xPosition, yPosition) => {
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
                    if (array[rowX][columnY] !== 0){
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


    return(
        <p>{array.map(x => <p>{x}</p>)}</p>
    )
}

export default Sudoku;