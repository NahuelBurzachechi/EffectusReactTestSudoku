const SudokuRules = (props) => {
    return(
        <div className="sudokuRules">
            <ul>
                {props.rules.map((x, index) => 
                    <li key={index}>
                        {x}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SudokuRules