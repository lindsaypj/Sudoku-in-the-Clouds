import React, { useState, useEffect } from "react";
import Cell from "./Cell.jsx";

import '../.././styles/css/board.css';

function SudokuBoard(props) {
    // Hooks to Manage Board state
    const [boardSize, setBoardSize] = useState(props.size);
    const [tabIndexOffset, setBoardIndex] = useState(props.boardIndex * boardSize * boardSize);

    // Update Board when parameters change
    useEffect(() => {
        setBoardSize(props.size);
        setBoardIndex(props.boardIndex * props.size * props.size);
    }, [props]);

    // Get cell data if it exists, or create blank board
    let cells = [];
    if (props.initialBoard) {
        cells = props.initialBoard;
    }
    else {
        // Initialze board with no data
        for (let i = 0; i < boardSize * boardSize; i++) {
            cells[i] = 0;
        }
    }
    

    const cellRows = new Array(cells.length);

    // Loop over cells to assign to row/group
    for (let cellRow = 0; cellRow < boardSize; cellRow++) {
        const newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow[col] = cells[col + (cellRow * boardSize)];
        }
        cellRows.push(newRow);
    }
    
    return(
        <div className={"board board-"+ boardSize}>
            {/* Map over rows */}
            {cellRows.map((row, rowIndex) => {
                return (
                <div key={rowIndex} className="cell-row">
                    {row.map((cellValue, cellIndex) => {
                        return (
                        <Cell 
                            key={cellIndex}
                            value={cellValue} 
                            size={boardSize} 
                            textVisibility={!(props.hideNums)}
                            index={tabIndexOffset + (rowIndex*boardSize) + cellIndex} 
                        />
                        );
                    })}
                </div>
                );
            })}
        </div>
    );
}

export default SudokuBoard;
