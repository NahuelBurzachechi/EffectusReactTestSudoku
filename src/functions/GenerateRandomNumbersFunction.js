import {InvalidSudoku} from "../functions/InvalidSudokuFunction";
import { Solve } from "../functions/CheckIfSudokuIsSolvable"

export function GenerateRandomNumbers(array) {
    let isFirst = true
    let numbersCount = 0
    let xPosition = Math.round(Math.random() * 8);
    let yPosition = Math.round(Math.random() * 8);
    let arrayPositions = []
    let tries = 0
    for (var x = 0; x < 1; x++){
        while (numbersCount < 9){
            if(array[xPosition][yPosition] === 0){
                let randomNumber = Math.round(Math.random() * 9);
                if(InvalidSudoku(array, randomNumber, xPosition, yPosition, isFirst)){
                    array[xPosition][yPosition] = 0;
                }else{
                    array[xPosition][yPosition] = randomNumber
                    numbersCount++;
                }
            }
            if(numbersCount === 9){
                var lastSolvableSudoku = Solve(array)
                if(lastSolvableSudoku){
                    arrayPositions = []
                    arrayPositions = JSON.parse(JSON.stringify(array));
                    tries = 0
                    continue
                }
                else{
                    numbersCount = numbersCount -9 < 0 ? 0 :  numbersCount -=9
                    if(arrayPositions.length !== 0){
                        array = []
                        array = JSON.parse(JSON.stringify(arrayPositions));
                    }
                }
            }
            else if (numbersCount < 9){
                tries++
                if (tries > 18){
                    return lastSolvableSudoku
                }
                xPosition = Math.round(Math.random() * 8);
                yPosition = Math.round(Math.random() * 8);
                continue
            }
        } 
        numbersCount = 0
    }
    return lastSolvableSudoku
}    