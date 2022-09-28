import {InvalidSudoku} from "../functions/InvalidSudokuFunction";

export function GenerateRandomNumbers(array) {
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
    return array
}    