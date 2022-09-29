export function InvalidSudoku (array, number , xPosition, yPosition, isFirst) {
    if(DuplicateRow(array, number, yPosition))
       return true;
    if(DuplicateColumn(array, number, xPosition))  
       return true;
    if(DuplicateBox(array, number, xPosition, yPosition, isFirst))
       return true;
   return false
}

export const DuplicateRow = (array, number, yPosition) => {
    let rowArray = [];  
    for (var x = 0; x < 9; x++){
        rowArray.push(array[x][yPosition]);
        if(rowArray.includes(number) || rowArray.includes(number + "firstInput"))
            return true;
    }
    return false
}

export const DuplicateColumn = (array, number, xPosition) => {
    let columnArray = [];
    for (var y = 0; y < 9; y++){
        columnArray.push(array[xPosition][y]);
        if(columnArray.includes(number) || columnArray.includes(number + "firstInput"))
            return true;
    }
    return false
}

export const DuplicateBox = (array, number, xPosition, yPosition, isFirst) => {
    let xPositionBox = Math.floor(xPosition / 3);
    let yPositionBox = Math.floor(yPosition / 3);
    let arrayBoxNumbers = [];
    for (var x = 0; x < 3; x++){
        for (var y = 0; y < 3; y++){
            let rowX = x + 3 * xPositionBox
            let columnY = y + 3 * yPositionBox
            arrayBoxNumbers.push(array[rowX][columnY])
            if(arrayBoxNumbers.includes(number) || arrayBoxNumbers.includes(number + "firstInput")){
                return true
            } 
        }
    }
    return false
}