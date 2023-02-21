import React, { useState, useEffect } from "react";
import Cell from "./Cell.jsx";

import '../.././styles/css/board.css';

function SudokuBoard({ size, initialBoard, boardIndex, hideNums }) {

    ////    BOARD STATE MANAGMENT    ////

    const [cells, setCells] = useState([]);
    const boardIdentifier = size+"-board-"+boardIndex;
    const cellCount = size*size;

    // Callback function to update the board when a cell is updated
    function updateCellOnBoard(index, value) {
        let valid = true;
        // Validate index
        if (isNaN(index) || index < 0 || index > cells.length) {
            valid = false;
        }
        // Validate value
        if (isNaN(value) || value < 0 || value > size) {
            valid = false;
        }

        // Update BoardState
        if (valid) {
            cells[index] = value;
            sessionStorage.setItem(boardIdentifier, JSON.stringify(cells));
        }
    }


    ////    BOARD INITIALIZATION    ////

    // Load board data from session on load
    // Check if session data exists
    const loadCells = JSON.parse(sessionStorage.getItem(boardIdentifier));
    if (loadCells !== null && loadCells !== undefined) {
        for (let i = 0; i < loadCells.length; i++) {
            cells[i] = loadCells[i];
        }
    }
    // Check if initialBoard was passed
    else if (initialBoard !== undefined && initialBoard !== null && initialBoard.length === cellCount) {
        cells.push(...initialBoard);
    }
    // Load blank board
    else {
        for (let i = 0; i < cellCount; i++) {
            cells[i] = 0;
        }
    }


    ////    RENDER BOARD    ////

    // Generate Rows and cols to map through
    const cellRows = [];
    for (let row = 0; row < size; row++) {
        const cellCols = [];
        for (let col = 0; col < size; col++) {
            cellCols[col] = row * size + col;
        }
        cellRows[row] = cellCols;
    }

    return(
        <div className={"board board-"+ size}>
            {/* Map over rows */}
            {cellRows.map((row, rowIndex) => {
                return (
                <div key={rowIndex} className="cell-row">
                    {row.map((cellValue, colIndex) => {
                        // Store value in BoardState
                        
                        // Prevent editing initial values
                        let disabled = true;
                        if (initialBoard === undefined || initialBoard[colIndex] === 0) {
                            disabled = false;
                        }
                        const cellIndex = (rowIndex * size) + colIndex;
                        return (
                            <Cell
                                key={cellIndex}
                                cellIndex={cellIndex}
                                size={size}
                                value={cells[cellIndex]} 
                                cellUpdateCallback={updateCellOnBoard}
                                textVisibility={!(hideNums)}
                                boardIndex={boardIndex + cellIndex}
                                disabled={disabled}
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
