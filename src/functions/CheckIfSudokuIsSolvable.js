const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]

export function Solve(sudokuArray) {
    if (Solved(sudokuArray)) {
        return sudokuArray
    }
    else {
        const possibilities = NextBoards(sudokuArray)
        const validBoards = KeepOnlyValid(possibilities)
        return SearchForSolution(validBoards.slice(0,4))
    }
}

function SearchForSolution(sudokuArrays){
    if (sudokuArrays.length < 1){
        return false
    }
    else {
        var first = sudokuArrays.shift()
        const tryPath = Solve(first)
        if (tryPath !== false){
            return tryPath
        }
        else{
            return SearchForSolution(sudokuArrays)
        }
    }
}


function Solved(sudokuArrays){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (sudokuArrays[i][j].toString()[0] === "0"){
                return false
            }
        }
    }
    return true
}

function NextBoards(sudokuArray){ 
    var response = []
    const firstEmpty = FindEmptySquare(sudokuArray)
    if (firstEmpty !== undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...sudokuArray]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            response.push(newBoard)
        }
    }
    return response
}

function FindEmptySquare(sudokuArray){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (sudokuArray[i][j].toString()[0] === "0") {
                return [i, j]
            }
        }
    }
}

function KeepOnlyValid(sudokuArrays){
    var response = []
    for (var i = 0; i < sudokuArrays.length; i++){
        if (ValidBoard(sudokuArrays[i])){
            response.push(sudokuArrays[i])
        }
    }
    return response
}


function ValidBoard(sudokuArray){
    return DuplicateRow(sudokuArray) && DuplicateColumn(sudokuArray) && DuplicateBox(sudokuArray)
}

function DuplicateRow(sudokuArray){
    for (var i = 0; i < 9; i++){
        var row = []
        for (var j = 0; j < 9; j++){
            if (row.includes(sudokuArray[i][j].toString()[0])){
                return false
            }
            else if (sudokuArray[i][j].toString()[0] !== "0"){
                row.push(sudokuArray[i][j].toString()[0])
            }
        }
    }
    return true
}

function DuplicateColumn(sudokuArray){
    for (var i = 0; i < 9; i++){
        var col = []
        for (var j = 0; j < 9; j++){
            if (col.includes(sudokuArray[j][i].toString()[0])){
                return false
            }
            else if (sudokuArray[j][i].toString()[0] !== "0"){
                col.push(sudokuArray[j][i].toString()[0])
            }
        }
    }
    return true
}


function DuplicateBox(sudokuArray){
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var box = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (box.includes(sudokuArray[coordinates[0]][coordinates[1]].toString()[0])){
                    return false
                }
                else if (sudokuArray[coordinates[0]][coordinates[1]].toString()[0] !== "0"){
                    box.push(sudokuArray[coordinates[0]][coordinates[1]].toString()[0])
                }
            }
        }
    }
    return true
}