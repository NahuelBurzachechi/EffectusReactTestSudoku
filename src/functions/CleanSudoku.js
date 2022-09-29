const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]

export function CleanSudoku(sudokuArray) {
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var positionsArray = new Set()
            while(positionsArray.size !== 6){
                positionsArray.add(Math.round(Math.random() * 8))
            }
            for(var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if(positionsArray.has(i)){
                    sudokuArray[coordinates[0]][coordinates[1]] = 0
                }
                else{
                    sudokuArray[coordinates[0]][coordinates[1]] = sudokuArray[coordinates[0]][coordinates[1]] + "firstInput"
                }
            }
        }
    }
}
