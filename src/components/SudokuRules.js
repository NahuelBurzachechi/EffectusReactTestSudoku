const SudokuRules = (props) => {
    return(
        <div className="sudokuRules">
            <p>How to play Sudoku?</p>
            <ol>
                {props.rules.map((x, index) => 
                    <li key={index}>
                        {x}
                    </li>
                )}
            </ol>
        </div>
    )
}

export default SudokuRules