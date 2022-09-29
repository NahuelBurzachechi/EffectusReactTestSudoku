import React, { useState } from "react";
import SudokuInput from "./SudokuInput";
import SudokuOutPut from "./SudokuOutPut";
import SudokuRules from "./SudokuRules";
import SudokuDialog from "./SudokuDialog";
import { InvalidSudoku } from "../functions/InvalidSudokuFunction";
import { GenerateRandomNumbers } from "../functions/GenerateRandomNumbersFunction";
import { firstScreenConstants, imagesUrl , dialogText } from "../constants/Constants";
import { CleanSudoku } from "../functions/CleanSudoku";
import "../styles/styles.css";

const Sudoku = () => {
    const [array, setArray] = useState();
    const [toPlay, setToPlay] = useState(false);
    const [percentageCount, setPercentageCount] = useState(0)
    const [outPutText, setOutPutText] = useState(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [dialogTextOutPut, setDialogTextoutPut] = useState()
    const [isBlured, setIsBlured] = useState(false)

    const CreateMatrix = () => {
        var array = []
        for(var i = 0; i < 9; i++){
            array.push([...new Array(9).fill(0)])
        }
        var newArrayWithNumbers = GenerateRandomNumbers(array)
        CleanSudoku(newArrayWithNumbers)
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
        Percentage()
        return response
    }

    const Percentage = () => {
        var count = -27
        array.map(x => x.map(y => y !== 0 ? count++ : count += 0))
        let percentage = (count * 100) / 54
        setPercentageCount(percentage)
    }

    const HandleDialogResponse = (response, dialogTextOutPut) => {
        setIsOpenDialog(false)
        if(response){
            setToPlay(false)
            if(dialogTextOutPut === dialogText.DIALOGTEXTRESET){
                setIsLoading(true)
                setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
                setTimeout(() => {
                    CreateMatrix()
                    setIsLoading(false)
            }, "100")
            } else{
                setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
            }
            setPercentageCount(0)
        }
        setIsBlured(false)
    }

    const HandleResetButton = (isFinished) => {
        if(isFinished){
            setToPlay(false)
            setIsLoading(true)
                setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
                setTimeout(() => {
                    CreateMatrix()
                    setIsLoading(false)
            }, "100")
            setPercentageCount(0)
        } else {
            setIsBlured(true)
            setDialogTextoutPut(dialogText.DIALOGTEXTRESET)
            setIsOpenDialog(true)
        }
    }

    const HandleExitButton = (isFinished) => {
        if(isFinished){
            setOutPutText(firstScreenConstants.WELCOMETOSUDOKUEFFECTUS)
            setToPlay(false)
            setPercentageCount(0)
        } else {
            setIsBlured(true)
            setDialogTextoutPut(dialogText.DIALOGTEXTEXIT)
            setIsOpenDialog(true)
        }
    }

    const HandleKeyDown = (xPosition, yPosition) => {
            array[xPosition][yPosition] = 0
            setArray([...array])
            setOutPutText("It's okey, it's okey, you can try again")
            Percentage()
    }
    return(
        <div>
            {isOpenDialog && 
                <div className="sudokuDialogWrapper"> 
                    <SudokuDialog 
                        openDialog={isOpenDialog} 
                        dialogText={dialogTextOutPut} 
                        handleDialogResponse={HandleDialogResponse}/>
                </div>
            }
            <div className={isBlured ? "sudokuWrapper App-blur" : "sudokuWrapper" }>
                {Math.round(percentageCount) === 100 ? 
                <div className="sudokuCongratulations">
                    <p>Congratulations!! You win!!</p>
                    <button 
                        id='resetButton' 
                        type="button" 
                        onClick={() => HandleResetButton(true)}>
                            Play Again!
                    </button>
                    <button 
                        id='exitButton' 
                        type="button" 
                        onClick={() => HandleExitButton(true)}>
                            Exit
                    </button>
                </div> :
                !toPlay ? isLoading ? <span>Loading...</span> :
                   <div className="first-screen-wrapper">
                       <img 
                            id="effectus-logo" 
                            src={imagesUrl.EFFECTUSLOGO} 
                            alt="Effectus Logo"/>
                       <button 
                            id='playButton' 
                            type="button" 
                            onClick={() => CreateMatrix()}>
                                Play
                        </button>
                       <SudokuRules 
                            rules={firstScreenConstants.RULES}/>
                    </div> :
                <div>
                    <SudokuOutPut 
                        percentage={percentageCount} 
                        outPutText={outPutText}
                    />
                    <div className="sudoku">
                        {array.map((x, xIndex)=> x.map((y, yIndex) => 
                          <SudokuInput 
                            key={xIndex + yIndex} 
                            number={y} 
                            xPosition={xIndex} 
                            yPosition={yIndex} 
                            handleChangeInput={HandleChangeInput}
                            handleKey={HandleKeyDown}
                          />
                        ))}
                    </div>
                    <button 
                        id='resetButton' 
                        type="button" 
                        onClick={() => HandleResetButton(false)}>
                            Reset
                    </button>
                    <button 
                        id='exitButton' 
                        type="button" 
                        onClick={() => HandleExitButton(false)}>
                            Exit
                    </button>
                </div>}  
            </div>         
        </div>
    )
}

export default Sudoku;