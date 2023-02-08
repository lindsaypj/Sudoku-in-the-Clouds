import React from "react";
import { useState } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";
import TestConficurator from "../components/TestConfigurator";

import ".././styles/css/testing.css";

/**
 * The Testing view is designed for testing funcitonality across board sizes,
 * configuring patterns across
 * @returns Testing view component
 */
function Testing() {
    const [numBoards, setNumBoards] = useState(1);
    const [boardSize, setBoardSize] = useState(4);
    const [hideNums, setHideNums] = useState(false);
    
    
    let boards = [];
  
    for (let i = 0; i < numBoards; i++) {
      boards[i] = 0;
    }
  
    return (
        <>
            {/* Configurator for adjusting board parameters */}
            <TestConficurator 
                setNumBoards={setNumBoards}
                numBoards={numBoards}
                setBoardSize={setBoardSize}
                hideNums={hideNums}
                setHideNums={setHideNums}
            />

            {/* Render Configured Boards */}
            <div className="testing-container">
                {boards.map((value, index) => (
                    <div key={index} className="board-container">
                        <SudokuBoard size={boardSize} hideNums={hideNums} boardIndex={index} />
                    </div>
                ))}
            </div>
        </>
    );
  }

  export default Testing;