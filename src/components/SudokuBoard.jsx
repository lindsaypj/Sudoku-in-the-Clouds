import React, { useState } from "react";
import Cell from "./Cell.jsx";

import '.././css/board.css';
import { useEffect } from "react";

function SudokuBoard(props) {
    // Hooks to Manage Board state
    const [boardSize, setBoardSize] = useState(props.size);
    const [tabIndexOffset, setBoardIndex] = useState(props.boardIndex * boardSize * boardSize);

    // Update Board when parameters change
    useEffect(() => {
        setBoardSize(props.size);
        setBoardIndex(props.boardIndex * props.size * props.size);
    }, [props]);

    const cells = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
        cells[i] = "";
    }

    const cellRows = new Array(cells.length);

    // Loop over cells to assign to row/group
    for (let cellRow = 0; cellRow < boardSize; cellRow++) {
        const newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow[col] = cells[col];
        }
        cellRows.push(newRow);
    }
    
    return(
        <div className={"board board-"+ boardSize}>
            {/* Map over rows */}
            {cellRows.map((row, rowIndex) => {
                return (
                <div className="cell-row">
                    {row.map((cellValue, cellIndex) => {
                        return (
                        <Cell 
                            value={cellValue} 
                            size={boardSize} 
                            textVisibility={props.hideNums}
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
